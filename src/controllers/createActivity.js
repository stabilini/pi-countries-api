const { Activity } = require('../db.js');

const createActivity = async (req, res) => {
  let { name, skill, duration, season, countries } = req.body;
  try {
    let result = await Activity.create({
      name: name,
      skill: skill,
      duration: duration,
      season: season,
    })
    if (countries) {
      await result.setCountries(countries);
      return res.status(200).json({msg: 'Activity created and linked'})
    }
    res.status(200).json({msg: 'Activity created'})
  } catch (error) {
    res.status(500).json({err: 'Conection to DB failed.', error})
  }
};

module.exports = createActivity;