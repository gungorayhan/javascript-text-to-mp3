const mongoose = require("mongoose")


const languageSchema = new mongoose.Schema({
    language: {
        type: String,
        required: true
    },
    abbreviate: {
        type: String,
        required: true
    },
    vocabulary: {
        type: String,
        required: true
    },
    mean: {
        type: String,
        default: ""
    },
    phonetic: {
        type: String,
        default: ""
    },
    pronunciation: {
        type: String,
        default: ""
    },
    text: [{
        text: {
            type: String,
            default: ""
        },
        textLevel: {
            type: String,
            default: ""
        },
        textVocabulary: [{
            vocabulary: {
                type: String,
                default: ""
            },
            mean: {
                type: String,
                default: ""
            },
            pronunciation: {
                type: String,
                default: ""
            },
            phonetic: {
                type: String,
                default: ""
            },
        }],
        textTranslate: [
            {
                textTranslate: { type: String, default: "" },
                translateLang: { type: String, default: "" }
            }
        ],
    }],
   
},{
    timestamps:true
})

const Language = mongoose.model("languages", languageSchema)

module.exports = Language