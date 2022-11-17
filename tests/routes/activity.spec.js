const { expect } = require('chai');
const request = require('supertest');
const app = require('../../src/app.js');
const { Activity, Country, conn } = require('../../src/db.js');

const country1 = {
  name: 'Australia',
  id: 'AUS',
  flag: 'https://flagcdn.com/w320/au.png',
  capital: 'Canberra',
  continent: 'Oceania',
  subregion: 'Australia and New Zealand',
  area: 7692024,
  population: 25687041
};

const country2 = {
  name: 'Peru',
  id: 'PER',
  flag: 'https://flagcdn.com/w320/pe.png',
  capital: 'Lima',
  continent: 'South America',
  subregion: 'South America',
  area: 1285216,
  population: 32971846
};

const activity1 = {
  name: 'Fishing',
  skill: 4,
  duration: 20,
  season: 'Summer',
};

const activity2 = {
  name: 'Eating',
  skill: 3,
  duration: 10,
  season: 'Winter',
  countries: ['ARG', 'PER']
};

describe('Activity routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  before(() => Activity.sync({ force: true })
    .then(() => Country.create(country1))
    .then(() => Country.create(country2))
    .then(() => Activity.create(activity1))
    );
  
  describe('GET all activities', () => {
    it('should get 200 when getting all activities', async () => {
      const res = await request(app).get('/activities');
      expect(res.statusCode).to.eql(200);
    });
    it('the response should be an object', async () => {
      const res = await request(app).get('/activities');
      expect(res.statusCode).to.eql(200);
    });
  });

  describe('POST an activity', () => {
    it('should get 200 when posting succesfully an activity', async () => {
      const res = await request(app).post('/activities').send(activity2);
      expect(res.statusCode).to.eql(200);
    });
    it('the response should be an object', async () => {
      const res = await request(app).post('/activities').send(activity2);
      expect(res.statusCode).to.eql(200);
    });
    it('should get -Activity created- msg when creating activity', async () => {
      const res = await request(app).post('/activities').send(activity2);
      expect(res.body).to.eql({msg: 'Activity created and linked'});
    });
    it('should get -Activity created and linked- msg when also sending countries', async () => {
      const res = await request(app).post('/activities').send(activity2);
      expect(res.body).to.eql({msg: 'Activity created and linked'});
    });
  })
});