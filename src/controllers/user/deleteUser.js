// var crypto = require('crypto');
const { Op } = require("sequelize");
const { User } = require('../../db.js');

const deleteUser = async (req, res) => {
  try {
    let { mail } = req.body;
    
    if (mail) {
      // let hashedpass = crypto.createHash('md5').update(pass).digest('hex');
      result = await User.findAll({
        where: {
          mail: mail,
        }
        })
        // {
        //   [Op.and]: [
        //     { mail: mail },
        //     { pass: hashedpass }
        //   ]
        // }
      };
      if (result.length === 1) {
        let deleted = await User.destroy({
          where: {
            mail: mail,
            // pass: hashedpass
          },
        });
        return res.status(200).json({status: 'ok', msg: 'User deleted.', data: deleted});
      // }
    }
    res.status(400).json({status: 'error', msg: 'Invalid user credentials.', data: []});
  } catch (error) {
    res.status(500).json({status: 'error', msg: 'Conection to DB failed.', data: error})
  }
};

module.exports = deleteUser;