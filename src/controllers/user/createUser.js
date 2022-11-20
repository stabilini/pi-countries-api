const crypto = require('crypto');

const { User } = require('../../db.js');

const createUser = async (req, res) => {
  let { mail, pass } = req.body;
  try {
    if (mail && pass) {
      var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      
      if (mail.match(validRegex)) {
        let hashedpass = crypto.createHash('md5').update(pass).digest('hex');
        let result = await User.create({
          mail: mail,
          pass: hashedpass,
        })

        return res.status(201).json({status: 'ok', msg: 'User created.', data: result})
      }
      return res.status(400).json({status: 'error', msg: 'Bad email format.', data: []})
    }
    res.status(400).json({status: 'error', msg: 'Missing information.', data: []})
  } catch (error) {
    res.status(500).json({status: 'error', msg: 'Conection to DB failed.', data: error})
  }
};

module.exports = createUser;