const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ClientSchema = new Schema({
    
    cin: {
        type: String,
        required: true
    },
    fName: {
        type: String,
        required: true
    },
    lName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    } ,
    phone : {
        type : Number , 
        required : true 
    } ,
    project : {
        type:String , 
        required : true
    }
        
           
}, { timestamps : { createdAt: 'created_at'}});

module.exports = Client = mongoose.model('client', ClientSchema)