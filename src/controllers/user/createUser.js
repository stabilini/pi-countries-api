const crypto = require('crypto');

const { User } = require('../../db.js');

const createUser = async (req, res) => {
  let { mail, pass } = req.body;
  try {
    if (mail && pass) {
      let hashedpass = crypto.createHash('md5').update(pass).digest('hex');
      let result = await User.create({
        mail: mail,
        pass: hashedpass,
      })
      res.status(200).json({msg: 'User created'})
    }
    res.status(404).json({msg: 'Missing information'})
  } catch (error) {
    res.status(500).json({err: 'Conection to DB failed.', error})
  }
};

module.exports = createUser;