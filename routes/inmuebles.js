const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { checkBody } = require('../middlewares/check-body');
const controladorInmueble = require('../controller/inmuebles');

router.get(
    '/', // ruta    
    controladorInmueble.mostrar //función
);

router.get(
    '/filtro', // ruta    
    controladorInmueble.mostrar_filtro //función
);

router.post(
    '/', 
    controladorInmueble.crear
);

router.get(
    '/distancia', // ruta    
    controladorInmueble.mostrar_distancia //función
);

router.get(
    '/filtroCsv', // ruta    
    controladorInmueble.crearCsv //función
);

module.exports = router;