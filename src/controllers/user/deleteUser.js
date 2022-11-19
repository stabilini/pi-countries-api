var crypto = require('crypto');
const { Op } = require("sequelize");
const { User } = require('../../db.js');

const deleteUser = async (req, res) => {
  try {
    let { mail, pass } = req.body;
    
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
      if (result.length === 1) {
        let deleted = await User.destroy({
          where: {
            mail: mail,
            pass: hashedpass
          },
        });
        res.status(200).json({msg: 'User deleted'});
      }
    }
    res.status(404).json({msg: 'Invalid user credentials'});
  } catch (error) {
    res.status(500).json({err: 'Conection to DB failed.', error})
  }
};

module.exports = deleteUser;