const express = require("express")

const routes = require("../routes")
module.exports = async (app) => {
 
    app.use(express.json())
    app.use(express.urlencoded({ extends: true }))
    app.use("/api/v1", routes)


    return app
}