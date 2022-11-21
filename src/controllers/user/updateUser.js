var crypto = require('crypto');

const { User } = require('../../db.js');

const updateUser = async (req, res) => {
  try {
    let { mail, pass } = req.body;
    if (mail && pass) {
      let hashedpass = crypto.createHash('md5').update(pass).digest('hex');
      let result = await User.update({ pass: hashedpass }, {
        where: {
          mail: mail,
        },
      });
      if(result[0] === 0) return res.status(400).json({status: 'error', msg: 'Invalid user credentials.', data: []});
      return res.status(200).json({status: 'ok', msg: 'User updated.', data: result});
    }
    res.status(400).json({status: 'error', msg: 'Invalid user credentials.', data: []});
  } catch (error) {
    res.status(500).json({status: 'error', msg: 'Conection to DB failed.', data: error})
  }
};

module.exports = updateUser;