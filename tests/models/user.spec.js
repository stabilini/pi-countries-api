const { expect } = require('chai');
const { User, conn } = require('../../src/db.js');

describe('User model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  
  describe('Validators', () => {
    beforeEach(async () => await User.sync({ force: true }));
    
    it('should throw an error if missing required fields', async () => {
      try {
        const test = await User.create({
          
        })
        expect(test).not.to.be.an('error');
      } catch (err) {
        expect(err).to.be.an('error');
      }
    });

    it('should throw an error if email is not an email', async () => {
      try {
        const test = await User.create({
          mail: 'JohnTravolta',
          pass: '9e9f9aacc1c49f58dbb392900a992c33',
        })
        expect(test).not.to.be.an('error');
      } catch (err) {
        expect(err).to.be.an('error');
      }
    });

    it('should throw an error if password is not a valid hashed one', async () => {
      try {
        const test = await User.create({
          mail: 'john@travolta.com',
          pass: 'zzzzzz',
        })
        expect(test).not.to.be.an('error');
      } catch (err) {
        expect(err).to.be.an('error');
      }
    });

    it('should create the user if all required fields are ok', async () => {
      const test = await User.create({
        mail: 'john@travolta.com',
        pass: '9e9f9aacc1c49f58dbb392900a992c33',
      })
      expect(test.toJSON()).to.include({
        mail: 'john@travolta.com',
        pass: '9e9f9aacc1c49f58dbb392900a992c33',
      });
    });
  });
});