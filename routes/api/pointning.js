let Pointning =require('../../models/pointning')
let express=require('express')
let router= express.Router()



let today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
//January is 0! 
var mm = String(today.getMonth() + 1).padStart(2, '0'); 
var yyyy = today.getFullYear();

today = yyyy+ '/'+ mm  +'/'+ dd;


router.get('/verify_pointning', (req, res) => {
    //var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)
    console.log(today)
    Pointning.find({Employee_Id :req.query.id , Creation_date : today }) // less then   , Hours: { $lt:10 }
    
    
    //.where(`creation_date = ${today}`)
    //.where('Hours<10')
     .then(doc => {
            
            res.json(doc)
            
        })
        .catch(err => {
            res.status(500).json(err)
        })
})




router.post('/pointning/add', (req, res)=>{ 
    //req.body
    if (!req.body) {
        return res.status(400).send("request body is missing")
    }  

    let model=new Pointning (req.body)
    model.save()
    .then(doc=>{
        if(!doc ||doc.length===0){
            return res.status(500).send(doc)
        }
        res.status(200).send(doc)

    }) 
        .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})
router.get('/pointningId', (req, res) => {
    //var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)

    Pointning.findOne({
        _id: req.query.id
    }) .then(doc => {
            
            res.json(doc)
            
        })
        .catch(err => {
            res.status(500).json(err)
        })
})


//why this get ???????????????????????????????????????
router.get('/pointning', (req, res) => {
    //var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)

    Pointning.find()
        .then(doc => {
           // res.setHeader('Access-Control-Expose-Headers', 'Content-Range');
            res.setHeader('Content-Range', 'users 0-5/5');
            res.json(doc)
            
        })
        .catch(err => {
            res.status(500).json(err)
        })
        
            
})







module.exports = router