module.exports = (sequelize, Sequelize) => {
    const Person = sequelize.define("person", {

        name: {
            type: Sequelize.STRING
        },

        age: {
            type: Sequelize.INTEGER
        },

        assignedLodge: {
            type: Sequelize.STRING
        }
    });
    return Person;
};