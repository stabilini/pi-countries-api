const { Country, Activity } = require("../db.js");

const findByIdCountry = async (req, res) => {
  try {
    let { idCountry } = req.params;
    let result = await Country.findAll({
      where: {
        id: idCountry
      },
      include: Activity
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({err: 'Conection to DB failed.', error})
  }
};

module.exports = findByIdCountry;