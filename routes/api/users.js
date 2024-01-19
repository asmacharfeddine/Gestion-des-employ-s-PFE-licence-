const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
//Load user model for email exist checking
const keys = require("../../config/keys");
const User = require("../../models/User");
const passport = require("passport");

//Load input  validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// @route  GET   api/users/register
// @desc   Register users route
// @access Public

router.post("/users/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "Email already exists";
      return res.status(400).json(errors);
    } else {
      

      const newUser = new User({
        cin: req.body.cin,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
        role: req.body.role
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route  GET   api/users/login
// @desc   Login users route => returning jwt token
// @access Public

router.post("/users/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  //Find user by email
  User.findOne({ email }).then(user => {
    if (!user) {
      errors.email = "addresse email introuvable";
      return res.status(404).json(errors);
    }
    //check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        //User Match

        //Create jt payload
        const payload = {
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          avatar: user.avatar,
          role: user.role
        };
        //Sign token token houwa 3jina ta3 des infos donc lazem nsignih bch ki  n7eb n5araj mail wala ay info mil 
        //jeton d'accés pour que je puisse entrer à n'importe à quel page de l'app sans demande de mdp 
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
              first_name: user.first_name,
              last_name: user.last_name
            });
          }
        );
      } else {
        errors.password = "mot de passe est  incorrect";
        return res.status(400).json(errors);
      }
    });
  });
});

// @route  GET   api/users/current
// @desc   Return/retrive the current user from the token
// @access Private

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // res.json(req.user);
    res.json({
      id: req.user.id,
      first_name: req.user.first_name,
      email: req.user.email
    });
  }
);

router.get("/users", (req, res) => {
  //var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)

  User.find()
      .then(doc => {
         // res.setHeader('Access-Control-Expose-Headers', 'Content-Range');
          res.setHeader('Content-Range', 'users 0-5/5');
          res.json(doc)
          
      })
      .catch(err => {
          res.status(500).json(err)
      })
      
          
})

router.post('/user', (req, res) => {
  //req.body
  if (!req.body) {
    return res.status(400).send("aaah request body is missing")
  }

  let model = new User(req.body)
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(model.password, salt, (err, hash) => {
      if (err) throw err;
      model.password = hash;
      model
        .save()
        .then(user => res.json(user))
        .catch(err => console.log(err));
    });
  });
 
})

router.get('/user', (req, res) => {
  //var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)

  User.findOne({
      _id: req.query.id
  })
      .then(doc => {
          
          res.json(doc)
          
      })
      .catch(err => {
          res.status(500).json(err) 
      })
})


router.put('/user/', (req, res) => {
  //var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)

  User.findOneAndUpdate({
    //rani bch nemchi nlawaj 3alaa user telque id ila fil back = id ila ani 3aditou mil front (bil bouton modifier)
      _id: req.query.id
      //ki nal9ah les valeurs 9dom ila fil back ya5dhou les valeurs jdod ila fil front 
  }, req.body,{
      new:true
  })
      .then(doc => {
          
          res.json(doc)
          
      })
      .catch(err => {
          res.status(500).json(err)
      })
})

router.delete('/user', (req, res) => {
  //var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)

  User.findOneAndRemove({
      _id: req.query.id
  })
      .then(doc => {
          
          res.json(doc)
          
      })
      .catch(err => {
          res.status(500).json(err)
      })
})

module.exports = router;
