const { expect } = require('chai');
const { Country, conn } = require('../../src/db.js');

describe('Country model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  
  describe('Validators', () => {
    beforeEach(async () => await Country.sync({ force: true }));
    
    it('should throw an error if missing required fields', async () => {
      try {
        const test = await Country.create({
          subregion: 'South America',
          area: 2780400,
          population: 45376763
        })
        expect(test).not.to.be.an('error');
      } catch (err) {
        expect(err).to.be.an('error');
      }
    });

    it('should throw an error if ID has more than 3 characters', async () => {
      try {
        const test = await Country.create({
          name: 'Argentina',
          id: 'AAAA',
          flag: 'https://flagcdn.com/w320/ar.png',
          capital: 'Buenos Aires',
          continent: 'South America',
          subregion: 'South America',
          area: 2780400,
          population: 45376763
        })
        expect(test).not.to.be.an('error');
      } catch (err) {
        expect(err).to.be.an('error');
      }
    });

    it('should throw an error if area is not a number', async () => {
      try {
        const test = await Country.create({
          name: 'Argentina',
          id: 'AAA',
          flag: 'https://flagcdn.com/w320/ar.png',
          capital: 'Buenos Aires',
          continent: 'South America',
          subregion: 'South America',
          area: '2780400',
          population: 45376763
        })
        expect(test).not.to.be.an('error');
      } catch (err) {
        expect(err).to.be.an('error');
      }
    });

    it('should throw an error if population is not a number', async () => {
      try {
        const test = await Country.create({
          name: 'Argentina',
          id: 'AAA',
          flag: 'https://flagcdn.com/w320/ar.png',
          capital: 'Buenos Aires',
          continent: 'South America',
          subregion: 'South America',
          area: 2780400,
          population: '45376763'
        })
        expect(test).not.to.be.an('error');
      } catch (err) {
        expect(err).to.be.an('error');
      }
    });

    it('should create the country if all required fields are ok', async () => {
      const test = await Country.create({
        name: 'Argentina',
        id: 'ARG',
        flag: 'https://flagcdn.com/w320/ar.png',
        capital: 'Buenos Aires',
        continent: 'South America',
        subregion: 'South America',
        area: 2780400,
        population: 45376763
      })
      expect(test.toJSON()).to.include({
        name: 'Argentina',
        id: 'ARG',
        flag: 'https://flagcdn.com/w320/ar.png',
        capital: 'Buenos Aires',
        continent: 'South America',
        subregion: 'South America',
        area: 2780400,
        population: 45376763      
      });
    });
  });
});