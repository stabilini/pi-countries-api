const { Activity } = require('../../db.js');

const createActivity = async (req, res) => {
  let { name, skill, duration, season, countries } = req.body;
  // Para testear demora del servidor
  // await new Promise(resolve => setTimeout(resolve, 3000));
  try {
    // Para testear que arroja errores
    // if (name === 'error') return res.status(400).json({status: 'error', msg: 'Bad name test.', data: []})
    if (!name || !skill || !duration || !season) return res.status(400).json({status: 'error', msg: 'Missing parameters.', data: []})
    if (skill < 0 || skill > 5) return res.status(400).json({status: 'error', msg: 'Invalid skill value.', data: []})
    if (duration < 1 || duration > 60) return res.status(400).json({status: 'error', msg: 'Invalid duration value.', data: []})
    if (!['Winter', 'Spring', 'Summer', 'Autumn'].includes(season)) return res.status(400).json({status: 'error', msg: 'Invalid season value.', data: []})
    let result = await Activity.create({
      name: name,
      skill: skill,
      duration: duration,
      season: season,
    })
    if (countries) {
      await result.setCountries(countries);
      return res.status(201).json({status: 'ok', msg: 'Activity created and linked.', data: result})
    }
    res.status(201).json({status: 'ok', msg: 'Activity created.', data: result})
  } catch (error) {
    res.status(500).json({status: 'error', msg: 'Conection to DB failed.', data: error})
  }
};

module.exports = createActivity;