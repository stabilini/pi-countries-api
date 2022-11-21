const { Country, Activity } = require('../../db.js');
const { Op } = require('sequelize');

const getCountries = async (req, res) => {
  let { name } = req.query;
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

  let result;
  // Para testear demora del servidor
  // await new Promise(resolve => setTimeout(resolve, 1000));
  try {
    if (name) {
      result = await Country.findAll({
        where: {
          name: {
            [Op.iLike]: `%${name}%`,
          }
        },
        include: Activity
      })
      if(result.length === 0) return res.status(200).json({status: 'ok', msg: 'No countries.', data: []})
    } else {
      result = await Country.findAll({include: Activity});
    }
    res.status(200).json({status: 'ok', msg: 'Retrieving countries.', data: result});
  } catch (error) {
    res.status(500).json({status: 'error', msg: 'Conection to DB failed.', data: error})
  }
};

module.exports = getCountries;