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
  res.header('Access-Control-Allow-Origin', 'https://pi-countries-client-production-08bf.up.railway.app');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});


// --- LLAMAMOS UNA SOLA VEZ A LA API EXTERNA, SOLO CUANDO SE LEVANTA EL SERVIDOR ---
// ESTO ES MEJOR QUE HACERLO EN LA RUTA DEL GET COMO PIDE EL README
// async function preloadCountries() {
//   let test = await Country.findAll({});
//   if (test.length === 0) {
//     axios
//       .get('https://restcountries.com/v3.1/all')
//       .then(data => {
//         let bulk = data.data.map(c => ({
//           id: c.cca3,
//           name: c.name.common,
//           flag: c.flags.png,
//           continent: c.continents[0],
//           capital: c.capital ? c.capital[0] : 'n/d',
//           subregion: c.subregion ? c.subregion : 'n/d',
//           area: c.area >= 0 ? c.area : 0,
//           population: c.population >= 0 ? c.population : 0
//         }))
//         Country.bulkCreate(bulk);
//         })
//       .then(console.log('Countries loaded from external API.'))
//       .catch(error => {
//         console.log(error);
//       });
//     }
//   }
// preloadCountries();
// --- FIN LLAMADO A LA API EXTERNA ---

server.use('/', routes);

// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;