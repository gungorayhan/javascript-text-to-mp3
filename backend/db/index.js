const mongoose = require("mongoose")
const{DB_URL}  = require("../config")

module.exports = async ()=>{
    try {
       await mongoose.connect(DB_URL,{
        // useNewUrlParser: true,
       })
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}