const express = require("express")
const path = require("path")
const routes = require("../routes")
module.exports = async (app) => {
    const __dirname = path.resolve();
    app.use(express.json())
    app.use(express.urlencoded({ extends: true }))
    app.use("/api/v1", routes)

    app.use(express.static(path.join(__dirname, "/frontend/dist")))
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"))
    })

    return app
}