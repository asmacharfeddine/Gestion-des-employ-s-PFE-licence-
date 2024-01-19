mongoose = require('mongoose')
let today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
//January is 0! 
var mm = String(today.getMonth() + 1).padStart(2, '0'); 
var yyyy = today.getFullYear();

today = yyyy+ '/'+ mm  +'/'+ dd;
const pointningSchema= mongoose.Schema({
    Pointning_Id: { 
        type: String,
        required: false,
        default: ''
    },
    Project_Id: { 
        type: String,
        required: true
    },
    Project_Name: {
        type: String,
        required: true
    },
    Employee_Fname: {
        type: String,
        required: true
    },
    Employee_Id: {
        type: String,
        required: true
    },
    Employee_Lname: {
        type: String,
        required: true
    },
    Hours: {
        type: Number,
        required: true
    },
    Description: {
        type: String,
        required: true
    }
    ,
    Creation_date : {
        type:String , 
        default : today
    }
})
    

module.exports =  Pointning = mongoose.model('pointning',pointningSchema)


