const { Router } = require('express');
const { checkJWT } = require('../middlewares/check-jwt');
const {check} =require('express-validator');
const {checkReq} = require('../middlewares/check-req')
const { isDate } = require('../helpers/isDate');
const { getLoads, createLoad, updateLoad, deleteLoad } = require('../controllers/loadEvents');

/*
Esta ruta se sirve en host + /api/loads
*/
const router = Router();

router.use(checkJWT)  

router.get('/', getLoads)
//Create
router.post(
    '/',
    [
        check('loading_place','Titulo requerido').not().isEmpty(),
        check('loading_date','fecha requerido').custom(isDate),
        check('unload_place','Titulo requerido').not().isEmpty(),
        check('unload_date','fecha requerido').custom(isDate),
        check('cargo_description','Titulo requerido').not().isEmpty(),
        checkReq
    ],
    createLoad
)
router.put('/:id',
[
    check('loading_place','Titulo requerido').not().isEmpty(),
    check('loading_date','fecha requerido').custom(isDate),
    check('unload_place','Titulo requerido').not().isEmpty(),
    check('unload_date','fecha requerido').custom(isDate),
    check('cargo_description','Titulo requerido').not().isEmpty(),
    checkReq
], updateLoad)

router.delete('/:id', deleteLoad)

module.exports = router;