const mongoose = require("mongoose")


const languageSchema = new mongoose.Schema({
    language:{
        type:String,
        required:true
    },
    abbreviate:{
        type:String,
        required:true
    },
    vocabulary:{
        type:String,
        required:true
    },
    mean:{
        type:String,
        default:""
    },
    text:{
        type:String,
        default:""
    },
    textLevel:{
        type:String,
        default:""
    },
    textTranslate:{
        type:String,
        default:""
    },
    textVocabulary:[{
        vocabulary:{type:String,default:""},
        mean:{type:String, default:""}
    }]

})

const Language = mongoose.model("languages",languageSchema)

module.exports= Language