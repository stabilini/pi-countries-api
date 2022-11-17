const { Country, Activity } = require('../db.js');
const { Op } = require('sequelize');

const getCountries = async (req, res) => {
  let { name } = req.query;
  let result;
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
      if(result.length === 0) return res.status(404).json({msg: 'No countries'})
    } else {
      result = await Country.findAll({include: Activity});
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({err: 'Conection to DB failed.', error})
  }
};

module.exports = getCountries;

// PRUEBA PARA PODER HACER CSS EN EL TRABAJO
// LUEGO BORRAR ESTO Y EL ARCHIVO ALLCOUNTRIES.JSON
// const allCountries = require('../allCountries.json');

// const getCountries = async (req, res) => {
//   let { name } = req.query;
//   let result;
//   try {
//     if (name) {
//       result = allCountries.map(c => ({
//         id: c.cca3,
//         name: c.name.common,
//         flag: c.flags.png,
//         continent: c.continents[0],
//         capital: c.capital ? c.capital[0] : 'n/d',
//         subregion: c.subregion ? c.subregion : 'n/d',
//         area: c.area >= 0 ? c.area : 0,
//         population: c.population >= 0 ? c.population : 0
//       }))
//       if(!result) return res.status(200).json({msg: 'No countries.'})
//     } else {
//       result = await Country.findAll({include: Activity});
//     }
//     res.status(200).json(result);
//   } catch (error) {
//     res.status(500).json({err: 'Conection to DB failed.', error})
//   }
// };

// module.exports = getCountries;