const { Country, Activity } = require("../db.js");

const getActivities = async (req, res) => {
  try {
    let result = await Country.findAll({include: Activity});
    let act = {};
    for (let i = 0; i < result.length; i++) {
      for (let x = 0; x < result[i].activities.length; x++) {
        let key = result[i].activities[x].name;
        act[key] = true;
      } 
    }
    res.status(200).json(act);
  } catch (error) {
    res.status(500).json({err: 'Conection to DB failed.', error})
  } 
};

module.exports = getActivities;