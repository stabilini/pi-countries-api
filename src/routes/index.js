const { Router } = require('express');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const findByIdCountry = require('../controllers/country/idCountry.js');
const getCountries = require('../controllers/country/getCountries.js');

const getActivities = require('../controllers/activity/getActivities.js');
const createActivity = require('../controllers/activity/createActivity.js');

const createUser = require('../controllers/user/createUser.js');
const getUser = require('../controllers/user/getUser.js');
const updateUser = require('../controllers/user/updateUser.js');
const deleteUser = require('../controllers/user/deleteUser.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/countries/:idCountry', findByIdCountry);
router.get('/countries', getCountries);

router.get('/activities', getActivities);
router.post('/activities', createActivity);

router.post('/users', createUser);
router.get('/users', getUser);
router.put('/users', updateUser);
router.delete('/users', deleteUser);


module.exports = router;