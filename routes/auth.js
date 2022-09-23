/*
Rutas de Autenticacion: host + /api/auth
*/

const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');
const {checkReq} = require('../middlewares/check-req');
const {
    createUser,
    renewToken,
    loginUser
} = require('../controllers/auth');
const { checkJWT } = require('../middlewares/check-jwt');

router.post(
    "/new",
    [
        check('name', 'el nombre es obligatorio').not().isEmpty(),
        check('email', 'el email es obligatorio').isEmail(),
        check('password', 'el password es obligatorio').isLength({ min: 6 }),
        check('role', 'el rol es obligatorio').not().isEmpty(),
        checkReq
    ],
    createUser
);

router.post(
    "/login",
    [
        check('email', 'el email es obligatorio').isEmail(),
        check('password', 'el password es obligatorio').isLength({ min: 6 }),
        checkReq
    ], 
    loginUser   
);

router.get("/renew", checkJWT, renewToken);



module.exports = router;