const db = require("../models");
const Person = db.people;
const Op = db.Sequelize.Op;
// Create and Save a new Person
exports.create = (req, res) => {

};
// Retrieve all people from the database.
exports.findAll = (req, res) => {

};
// Find a single person with an id
exports.findOne = (req, res) => {

};
// Update a person by the id in the request
exports.update = (req, res) => {

};
// Delete a person with the specified id in the request
exports.delete = (req, res) => {

};
// Delete all people from the database.
exports.deleteAll = (req, res) => {

};
// Find all published people
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
    // Create a Person
    const person = {
        name: req.body.name,
        age: req.body.age,
        assignedLodge: req.body.assignedLodge
    };
    // Save person in the database
    Person.create(person)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the person."
            });
        });

};

exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
    Person.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving people."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;
    Person.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Person with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving person with id=" + id
            });
        });
};


exports.update = (req, res) => {
    const id = req.params.id;
    Person.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Person was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update person with id=${id}. Maybe person was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating person with id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;
    Person.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Person was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete person with id=${id}. Maybe person was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete person with id=" + id
            });
        });
};


exports.deleteAll = (req, res) => {
    Person.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} People were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all people."
            });
        });
};