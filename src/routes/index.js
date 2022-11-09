const { Router } = require('express');
const { Op } = require('sequelize');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const findByIdCountry = require('../controllers/idCountry.js');
const getCountries = require('../controllers/getCountries.js');
const getActivities = require('../controllers/getActivities.js');
const createActivity = require('../controllers/createActivity.js');
//const getContinents = require('../controllers/getContinents.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/countries/:idCountry', findByIdCountry);
router.get('/countries', getCountries);
router.get('/activities', getActivities);
router.post('/activities', createActivity);
//router.get('/continents', getContinents);


// RUTAS DE PRUEBA, BORRAR TODO PARA EL FINAL
const { Country, Activity } = require('../db.js');

// ESTA RUTA ES PROPIA, NO PEDIDA EN EL PI, ES PARA AGREGAR ACTIVIDADES
// A UN PAIS... DESPUES VER COMO VERLO EN EL FRONT
router.post('/assign', async (req, res) => {
  // esto hay que cambiarlo para que reciba varias actividades
  // wanda sequelize en 1.08.00 lo explica
  try {
    let { idCountry, idActivity } = req.body; 
    let country = await Country.findByPk(idCountry);
    let result = await country.setActivities(idActivity);
    res.status(200).json({msg: 'Actividad/es agregada/s.'});
  } catch (error) {
    res.status(500).json({err: error});
  }
});



module.exports = router;
