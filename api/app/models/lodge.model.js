module.exports = (sequelize, Sequelize) => {
    const Lodge = sequelize.define("lodge", {
      
        name: {
            type: Sequelize.STRING
        },

        nrOfBeds: {
            type: Sequelize.INTEGER
        },
        nrOfPersons: {
            type: Sequelize.INTEGER
        },
        freeBeds: {
            type: Sequelize.INTEGER
        },
        type: {
            type: Sequelize.STRING
        },
        region: {
            type: Sequelize.STRING
        }
    });
    return Lodge;
};