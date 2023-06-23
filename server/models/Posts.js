const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    
    image : {
        publicId : String,
        url : String
    },
    caption : {
        type: String ,
        required : true
    },
    owner:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user',
        required : true
    },
    likes:[{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
    }],
    
},{
    timestamps : true
})

module.exports =  mongoose.model("post",postSchema);