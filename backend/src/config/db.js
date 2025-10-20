require('dotenv').config(); // Carga las variables de backend/.env
const mysql = require('mysql2'); 

const conexion = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

conexion.connect((error) => {
  if (error) {
    console.error('Error conectando a MySQL:', error.message);
  } else {
    console.log('Conectado a la base de datos MySQL');
  }
});

module.exports = conexion;
