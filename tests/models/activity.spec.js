const { expect } = require('chai');
const { Activity, conn } = require('../../src/db.js');

describe('Activity model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  
  describe('Validators', () => {
    beforeEach(async () => await Activity.sync({ force: true }));
    
    it('should throw an error if missing required fields', async () => {
      try {
        const test = await Activity.create({
          skill: 3,
          season: 'Winter',
        })
        expect(test).not.to.be.an('error');
      } catch (err) {
        expect(err).to.be.an('error');
      }
    });

    it('should throw an error if skill is not a number', async () => {
      try {
        const test = await Activity.create({
          name: 'Fishing',
          skill: '3',
          duration: 20,
          season: 'Winter',
        })
        expect(test).not.to.be.an('error');
      } catch (err) {
        expect(err).to.be.an('error');
      }
    });

    it('should throw an error if duration is not a number', async () => {
      try {
        const test = await Activity.create({
          name: 'Fishing',
          skill: 3,
          duration: '20',
          season: 'Winter',
        })
        expect(test).not.to.be.an('error');
      } catch (err) {
        expect(err).to.be.an('error');
      }
    });

    it('should throw an error if season is not an aproved type', async () => {
      try {
        const test = await Activity.create({
          name: 'Fishing',
          skill: 3,
          duration: 20,
          season: 'Winter',
        })
        expect(test).not.to.be.an('error');
      } catch (err) {
        expect(err).to.be.an('error');
      }
    });

    it('should create the activity if all required fields are ok', async () => {
      const test = await Activity.create({
        name: 'Fishing',
        skill: 3,
        duration: 20,
        season: 'Winter',
      })
      expect(test.toJSON()).to.include({
        name: 'Fishing',
        skill: 3,
        duration: 20,
        season: 'Winter',
      });
    });
  });
});