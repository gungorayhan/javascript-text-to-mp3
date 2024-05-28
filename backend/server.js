const express = require("express")
const dbConnect = require("./db")
const App = require("./app")
const {PORT} = require("./config")

async function StartServer() {
    const app = express()
    
    await dbConnect()

    await App(app)

    app.listen(PORT, () => {
        console.log("server is running on port 8000")
    })
}

StartServer()