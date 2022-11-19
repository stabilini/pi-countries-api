const { Country, Activity } = require('../../db.js');
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