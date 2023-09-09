const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const specialcodeSchema = new Schema({
        emailDoc:{
            type:String,
            default:""
        },
        emailadmin:{
            type:String,
            required:true
        },
        code:{
            type:String
        },
        createdAt:{
            type:Date,
           defult:Date.now()
         }
      

});
module.exports = mongoose.model("Code",specialcodeSchema );


