const { Router } = require('express');

const router = Router();
// Crear User
router.post('/new', (req,res)=>{
    return res.json({
        ok: true,
        msg: 'Crear usuario/new'
    })
})
// Login de User
router.get('/renew', (req,res)=>{
    return res.json({
        ok: true,
        msg: 'Login de usuario/'
    })
})
module.exports = router;
