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
      if(result.length === 0) return res.status(404).json({msg: 'Invalid user credentials'});
    } else {
      result = await User.findAll();
      if(result.length === 0) return res.status(404).json({msg: 'No users'})
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({err: 'Conection to DB failed.', error})
  }
};

module.exports = getUser;