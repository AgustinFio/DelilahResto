const Sequelize = require('sequelize');
const sequelize = new Sequelize("mysql://root@127.0.0.1:3306/delilah_resto");

const db = {
    Sequelize : Sequelize,  //Sequelize con S mayuscula hace referencia a la libreria//
    sequelize : sequelize   //Sequelize con S minuscula es la instancia de conexion a la base de datos//
}

module.exports = db;


//