module.exports = (app) => {
    const maintenance =  require("../Controllers/maintenance.controller")
    var router = require( "express").Router()


    router.post("/create",maintenance.create)
    router.get("/all",maintenance.findAll)
    router.get("/recbyid/:id",maintenance.maintainById)
    router.put("/update/:id",maintenance.update)
    router.put("/delete/:id",maintenance.DeleteMaintainFromId)
    router.get("/allactive",maintenance.findAllActive)
    router.post("/email",maintenance.requestMaintenancePermission)

    app.use("/api/maintenance",router)
}