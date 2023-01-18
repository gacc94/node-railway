const { Router } = require('express');
const { createUser, loginUser, updateToken } = require("../controllers/auth");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/vlidar-jwt");

const router = Router();

// Crear User
router.post('/new', [
    check('name', 'El nombre es obligatoro').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').isLength({ min: 6 }),
    validarCampos,
], createUser);

//Login User
router.post('/', [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').isLength({ min: 6 }),
    validarCampos,
], loginUser)

// Update Token
router.get('/renew', validarJWT, updateToken)
module.exports = router;
