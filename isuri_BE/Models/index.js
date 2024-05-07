const dbConfig = require("../Config/db.config.js")

const mongoose = require("mongoose")

const db = {}
db.mongoose = mongoose
db.url = dbConfig.url

db.maintenance = require("./maintenance.model.js")(mongoose)
db.spare = require("./spare.model.js")(mongoose)

module.exports = db