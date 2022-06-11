module.exports = (sequelize, Sequelize) => {
    const Lodge = sequelize.define("person", {
      
        name: {
            type: Sequelize.STRING
        },

        lodgeAssignment: {
            type: Sequelize.STRING
        },
        age: {
            type: Sequelize.INTEGER
        }
    });
    return Lodge;
};