const { Country } = require("../db.js");

const getContinents = async (req, res) => {
  try {
    result = await Country.findAll({
      attributes: ['continent'],
      group: ['continent'],
      order: ['continent']
    })
    let final = result.map(c => c.continent)
    res.status(200).json(final);
  } catch (error) {
    res.status(500).json({err: 'Conection to DB failed.', error})
  }
};

module.exports = getContinents;