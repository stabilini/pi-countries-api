const crypto = require('crypto');
const { Op } = require("sequelize");
const { User } = require('../../db.js');

const getUser = async (req, res) => {
  let { mail, pass } = req.body;
  let result;
  try {
    if (mail && pass) {
      let hashedpass = crypto.createHash('md5').update(pass).digest('hex');
      result = await User.findAll({
        where: 
        {
          [Op.and]: [
            { mail: mail },
            { pass: hashedpass }
          ]
        }
      });
      if(result.length === 0) return res.status(400).json({status: 'error', msg: 'Invalid user credentials.', data: []});
    } else {
      result = await User.findAll();
      if(result.length === 0) return res.status(200).json({status: 'ok', msg: 'No users.', data: []})
    }
    res.status(200).json({status: 'ok', msg: 'Retrieving users.', data: result});
  } catch (error) {
    res.status(500).json({status: 'error', msg: 'Conection to DB failed.', data: error})
  }
};

module.exports = getUser;