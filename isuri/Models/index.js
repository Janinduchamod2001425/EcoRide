const dbConfig = require("../Config/db.config.js")

const mongoose = require("mongoose")
//mongoose.Promise = global.Promise

const db = {}
db.mongoose = mongoose
db.url = dbConfig.url

db.maintenance = require("./maintenance.model")(mongoose)
//db.patient = require("./patient.model")(mongoose)
// db.user = require("./user.model")(mongoose)
// db.appointment = require("./appointment.model")(mongoose)

//db.ROLES = ["frontdest", "admin", "doctor"];

module.exports = db