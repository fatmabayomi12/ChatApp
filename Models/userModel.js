const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({

    id : {
        type : Number,
    },
    userName : {
        type : String,
        
    },
    phone : {
        type : String,
    },
    email : {
        type : String,
        unique : true
    },
    password : {
        type : String        
    },
    profile : {
        type : String
    }
})

const userModel = mongoose.model('Users',userSchema);

module.exports = userModel;

