const db = require("../Models")
const Maintenance = db.maintenance

exports.create = (req, res) => {
    const  maintenance = new Maintenance({
        id: req.body.id,
        vin: req.body.vin,
        make: req.body.make,
        model: req.body.model,
        year: req.body.year,
        mileage: req.body.mileage,
        serviceDate: req.body.serviceDate,
        nextServiceDate: req.body.nextServiceDate,
        licensePlate:  req.body.licensePlate,
        maintenanceStatus: req.body.maintenanceStatus,
        ownersEmail: req.body.ownersEmail
    })
    maintenance
        .save(maintenance)
        .then((data)=>{
            res.send(data)
        } )
        .catch((err)=> {
            res.status(500).send({
                message: err.message
            })
        })
}

exports.findAll = (req, res) => {
    Maintenance.find()
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving maintenance records."
            })
        })
}


exports.maintainById = (req, res) => {
    const id = req.params.id

    Maintenance.find({ _id: id })
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving maintenance records."
            })
        })
}

exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    const id = req.params.id

    Maintenance.findOneAndUpdate({ _id: id }, { $set: req.body })
    .then(data => {

    if (data) {
    res.send(true);

    } else 
        res.status(404).send({
            message: `Cannot update maintenance with id=${id}`,
        });
    })
    .catch((err) => {
        res.status(500).send({
            message: `Error updating maintenance with id=${id}`
         });
    });
};


exports.DeleteMaintainFromId = (req, res) => {
    const Id = req.params.id

    Maintenance.findByIdAndUpdate({ _id: Id }, { $set: { maintenanceStatus: false } })
        .then(data => {

            if (data) {
                res.send(true)

            } else res.status(404).send({
                message: `Cannot delete maintenance with id=${Id}. Maybe maintenance was not found!`
            })
        })
        .catch((err) => {
            res.status(500).send({
                message: err
            })
        })
}



