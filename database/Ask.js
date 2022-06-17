const sequelize = require("sequelize");
const connection = require("./database");

const Ask = connection.define("ask", {
    title: {
        type: sequelize.STRING,
        allowNull: false
    },
    question: {
        type: sequelize.TEXT,
        allowNull: false
    }    
});

Ask.sync({force: false}).then(() =>{});

module.exports = Ask;