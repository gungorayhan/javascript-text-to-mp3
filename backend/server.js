const express = require("express")
const dbConnect = require("./db")
const App = require("./app")
const {PORT} = require("./config")
const path =  require("path")

async function StartServer() {
    const app = express()
    const __dirname = path.resolve();
    await dbConnect()

    await App(app)

      
    app.use(express.static(path.join(__dirname, "/frontend/dist")))
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"))
    })

    app.listen(PORT, () => {
        console.log("server is running on port 8000")
    })
}

StartServer()