const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const users = require("./routes/api/users");
const project = require("./routes/api/project");

var cors = require('cors');

const client = require ('./routes/api/client')
const pointning = require ('./routes/api/pointning')
const app = express();

// Db Config
const db = require("./config/keys").mongoURI;

//Passport middileware
passport.use(passport.initialize());  

//passport config will in
require("./config/passport")(passport);

//Body Parser
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit:1000000}));
app.use(bodyParser.json({limit: '50mb', extended: true}));

//Connect to mongodb through mongoose
mongoose
  .connect(db,  { useNewUrlParser: true , useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.get("/", (req, res) => res.send("Hello World"));

//Use routes
app.use(cors());
app.options("*", cors());
// ktiba 9dima : app.use('/api/users',userRouter) //exécution du fichier userRoutes sur le route '/api/users' 
//jab il file ilkol (fih les routes ilkol donc ma yo93odich issami bil wa7ed bil wa7ed ) 
app.use(users);
app.use(client);
app.use(project);
app.use(pointning);




const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on Port ${port}`));
