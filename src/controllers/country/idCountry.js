const { Country, Activity } = require('../../db.js');

const findByIdCountry = async (req, res) => {
  try {
    // Para testear demora del servidor
    // await new Promise(resolve => setTimeout(resolve, 3000));
    let { idCountry } = req.params;
    if (idCountry.length > 3) return res.status(404).json({status: 'error', msg: 'Invalid ID length.', data: []});
    let result = await Country.findAll({
      where: {
        id: idCountry
      },
      include: Activity
    });
    if(result.length === 0) return res.status(404).json({status: 'error', msg: 'No country with that ID.', data: []});
    res.status(200).json({status: 'ok', msg: 'Retrieving country.', data: result});
  } catch (error) {
    res.status(500).json({status: 'error', msg: 'Conection to DB failed.', data: error})
  }
};

module.exports = findByIdCountry;