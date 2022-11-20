const { Country, Activity } = require('../../db.js');

const getActivities = async (req, res) => {
  try {
    let result = await Activity.findAll();
    let act = {}
    if(result.length === 0) return res.status(200).json({status: 'ok', msg: 'No activities.', data: act});
    
    for (let i = 0; i < result.length; i++) {
      let key = result[i].name;
      act[key] = true;
    }
    res.status(200).json({status: 'ok', msg: 'Retrieving activities.', data: act});
  } catch (error) {
    res.status(500).json({status: 'error', msg: 'Conection to DB failed.', data: error})
  } 
};

module.exports = getActivities;