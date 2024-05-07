const db = require("../Models")
const Spare = db.spare

exports.create = (req, res) => {
    const  spare = new Spare({
        id: req.body.id,
        name : req.body.name,
        price : req.body.price,
        stock : req.body.stock,
        discount: req.body.discount, 
        available : req.body.available
    })
    spare
        .save(spare)
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
    Spare.find()
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving spare records."
            })
        })
}


exports.maintainById = (req, res) => {
    const id = req.params.id

    Spare.find({ _id: id })
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving sapre records."
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

    Spare.findOneAndUpdate({ _id: id }, { $set: req.body })
    .then(data => {

    if (data) {
    res.send(true);

    } else 
        res.status(404).send({
            message: `Cannot update spare with id=${id}`,
        });
    })
    .catch((err) => {
        res.status(500).send({
            message: `Error updating spare with id=${id}`
         });
    });
};


exports.DeleteMaintainFromId = (req, res) => {
    const Id = req.params.id

    Spare.findByIdAndUpdate({ _id: Id }, { $set: { available: false } })
        .then(data => {

            if (data) {
                res.send(true)

            } else res.status(404).send({
                message: `Cannot delete spare with id=${Id}. Maybe spare was not found!`
            })
        })
        .catch((err) => {
            res.status(500).send({
                message: err
            })
        })
}



exports.findAllActive = (req, res) => {
    Spare.find({ available: true }) // Filter by maintenanceStatus being true (active)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving spare records."
            });
        });
};


exports.reduceStock = async (req, res) => {
    const { id } = req.params;

    try {
        const sparePart = await Spare.findById(id);

        if (!sparePart) {
            return res.status(404).json({ message: 'Spare part not found' });
        }

        if (sparePart.stock <= 0) {
            return res.status(400).json({ message: 'Spare part out of stock' });
        }

        sparePart.stock -= 1; // Reduce stock by one

        await sparePart.save();

        return res.json({ message: 'Stock reduced successfully', sparePart });
    } catch (error) {
        console.error('Error reducing stock:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
