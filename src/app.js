const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
// const morgan = require('morgan');
const routes = require('./routes/index.js');
const axios = require('axios');

const { Country, Activity } = require('./db.js');

require('./db.js');

const server = express();

server.name = 'API';

server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
// server.use(morgan('dev'));
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://pi-countries-client-production-08bf.up.railway.app'); // * para aceptar conexiones de cualquier lado
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});


// obtiene los datos de la API y los guarda en la DB, solo se ejecuta al levantar el back
// VER FRANCO 12 REACT REDUX 46.33 DEL LECTURE QUE EXPLICA ALGO DE AXIOS (para sacar el let countries = data.data)
async function preloadCountries() {
  let test = await Country.findAll({});
  if (test.length === 0) {
  axios
    .get('https://restcountries.com/v3.1/all')
    // .then(data => {
    //   let countries = data.data;
      
    //   for (let i = 0; i < 10; i++) {
    //     Country.create({
    //       id: countries[i].cca3,
    //       name: countries[i].name.common,
    //       flag: countries[i].flags.png,
    //       continent: countries[i].continents[0],
    //       capital: countries[i].capital ? countries[i].capital[0] : 'n/d',
    //       subregion: countries[i].subregion ? countries[i].subregion : 'n/d',
    //       area: countries[i].area >= 0 ? countries[i].area : 0,
    //       population: countries[i].population >= 0 ? countries[i].population : 0,
    //     });
    //   }
      
    // })
    .then(data => {
      let bulk = data.data.map(c => ({
        id: c.cca3,
        name: c.name.common,
        flag: c.flags.png,
        continent: c.continents[0],
        capital: c.capital ? c.capital[0] : 'n/d',
        subregion: c.subregion ? c.subregion : 'n/d',
        area: c.area >= 0 ? c.area : 0,
        population: c.population >= 0 ? c.population : 0
      }))
      Country.bulkCreate(bulk);
    })
    .then(console.log('Countries loaded from external API.'))
    .catch(error => {
      console.log(error);
    });
  }
}
preloadCountries();

server.use('/', routes);

// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;