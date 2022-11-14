const { Country, Activity } = require("../db.js");

const getActivities = async (req, res) => {
  try {
    let result = await Activity.findAll();
    let act = {}

    for (let i = 0; i < result.length; i++) {
      let key = result[i].name;
      act[key] = true;
    }
    res.status(200).json(act);
  } catch (error) {
    res.status(500).json({err: 'Conection to DB failed.', error})
  } 
};

module.exports = getActivities;