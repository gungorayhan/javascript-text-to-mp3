const dotenv = require("dotenv").config()


module.exports = {
    DB_URL:process.env.DB_URL || "mongodb://127.0.0.1:27017/languageLearnTool",
    PORT:parseInt(process.env.PORT )|| 8000
}