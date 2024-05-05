module.exports = (app) => {
    const spare =  require("../Controllers/spare.controller")
    var router = require( "express").Router()


    router.post("/create",spare.create)
    router.get("/all",spare.findAll)
    router.get("/recbyid/:id",spare.maintainById)
    router.put("/update/:id",spare.update)
    router.put("/delete/:id",spare.DeleteMaintainFromId)
    router.get("/allactive",spare.findAllActive)

    app.use("/api/spare",router)
}