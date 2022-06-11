const db = require("../models");
const Lodge = db.lodges;
const Op = db.Sequelize.Op;
// Create and Save a new Lodge
exports.create = (req, res) => {

};
// Retrieve all lodges from the database.
exports.findAll = (req, res) => {

};
// Find a single lodge with an id
exports.findOne = (req, res) => {

};
// Update a lodge by the id in the request
exports.update = (req, res) => {

};
// Delete a Lodge with the specified id in the request
exports.delete = (req, res) => {

};
// Delete all Lodges from the database.
exports.deleteAll = (req, res) => {

};
// Find all published Lodges
exports.findAllPublished = (req, res) => {

};



exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    // Create a Lodge
    const lodge = {
        name: req.body.name,
        nrOfBeds: req.body.nrOfBeds,
        nrOfPersons: req.body.pnrOfPersons,
        freeBeds: req.body.freeBeds,
        type: req.body.type,
        region: req.body.region

    };
    // Save lodge in the database
    Lodge.create(lodge)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the lodge."
            });
        });

};

exports.findAll = (req, res) => {
    const region = req.query.region;
    var condition = region ? { region: { [Op.like]: `%${region}%` } } : null;
    Lodge.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving lodges."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;
    Lodge.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Lodge with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Lodge with id=" + id
            });
        });
};


exports.update = (req, res) => {
    const id = req.params.id;
    Lodge.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Lodge was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Lodge with id=${id}. Maybe Lodge was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Lodge with id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;
    Lodge.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Lodge was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Lodge with id=${id}. Maybe Lodge was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Lodge with id=" + id
            });
        });
};


exports.deleteAll = (req, res) => {
    Lodge.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Lodges were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Lodges."
            });
        });
};