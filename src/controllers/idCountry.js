const { Country, Activity } = require('../db.js');

const findByIdCountry = async (req, res) => {
  try {
    let { idCountry } = req.params;
    let result = await Country.findAll({
      where: {
        id: idCountry
      },
      include: Activity
    });
    if(result.length === 0) return res.status(404).json({msg: 'No countries'});
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({err: 'Conection to DB failed.', error})
  }
};

module.exports = findByIdCountry;