const { Router } = require('express');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const findByIdCountry = require('../controllers/idCountry.js');
const getCountries = require('../controllers/getCountries.js');
const getActivities = require('../controllers/getActivities.js');
const createActivity = require('../controllers/createActivity.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/countries/:idCountry', findByIdCountry);
router.get('/countries', getCountries);
router.get('/activities', getActivities);
router.post('/activities', createActivity);


module.exports = router;