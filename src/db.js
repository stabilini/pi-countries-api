require('dotenv').config();
const axios = require('axios');
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');

// DEPLOY USAR SIGUIENTE LINEA (DEBE ESTAR CARGADO EL .ENV EN EL HOSTING)
const { DEPLOY } = process.env;
// DEVELOPMENTE USAR SIGUIENTE LINEA
// const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

// DEPLOY USAR SIGUIENTE LINEA (DEBE ESTAR CARGADO EL .ENV EN EL HOSTING)
const sequelize = new Sequelize('postgresql://postgres:WNfvwkUwFaZIWRsyNyci@containers-us-west-127.railway.app:5941/railway', {
// DEVELOPMENTE USAR SIGUIENTE LINEA
// const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/countries`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Country, Activity } = sequelize.models;

// Aca vendrian las relaciones
Country.belongsToMany(Activity, { through: 'country_activity'});
Activity.belongsToMany(Country, { through: 'country_activity'});

// Llamamos una sola vez a la API externa y guardamos todos los paises en la BD
// EN DEPLOY NO USAR LA CONEXION ACA, USARLA EN APP.JS
// axios
//   .get('https://restcountries.com/v3.1/all')
//   .then(data => {
//     let bulk = data.data.map(c => ({
//       id: c.cca3,
//       name: c.name.common,
//       flag: c.flags.png,
//       continent: c.continents[0],
//       capital: c.capital ? c.capital[0] : 'n/d',
//       subregion: c.subregion ? c.subregion : 'n/d',
//       area: c.area >= 0 ? c.area : 0,
//       population: c.population >= 0 ? c.population : 0
//     }))
//     Country.bulkCreate(bulk);
//   })
//   .then(console.log('Countries loaded from external API.'))
//   .catch(error => {
//     console.log(error);
//   });


module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};
