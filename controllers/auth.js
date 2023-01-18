const { response }  = require('express')
const User          = require('../models/User')
const bcrypt        = require('bcryptjs');
const {generarJWT}  = require("../helpers/jwt");
const createUser = async (req ,res = response)=>{
    const {name, email , password } = req.body;
    try {
        // VERIFICAR EMAIL
        const emailExists = await User.findOne({ email });
        if( emailExists) {
            return res.status(400).json({
                ok:false,
                msg: 'El usuario existe con el mismo email'
            })
        }

        // CREAR USUARIO
        const dbUser = new User(req.body);
        // Hashear contraseña
        const salt = bcrypt.genSaltSync();
        dbUser.password  = bcrypt.hashSync(password, salt);

        // Generar JWT
        const token = await generarJWT(dbUser.id, name);


        // Crear usuario de DB
        const createUser = await dbUser.save();

        // Generar respuesta exitosa
        return res.status(201).json({
            ok: true,
            msg: "Usuario creado exitosamente.",
            data: {
                createUser,
            },
            token,
        });


    } catch(error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Fallo la solicitud: Comuníquese con el administrador.",
            data: {
                error,
            },
        });
    }

}

const loginUser = async (req, res= response)=>{

    const { name, email, password } = req.body;
    try{

        const dbUser = await User.findOne({email});
        if(!dbUser){
            return res.json({
                ok:false,
                msg: 'El correo no existe',
            })
        };

    //     Confirmar si el password hace match
        const validarPassword = bcrypt.compareSync( password, dbUser.password);
        if(!validarPassword){
            return res.status(400).json({
                ok:false,
                msg: 'El password no es valido',
            })
        };
        const token = await generarJWT(dbUser.id, dbUser.name);

        return res.status(201).json({
            ok: true,
            uid: dbUser.id,
            name: dbUser.name,
            // email, dbUser.email,
            token,
            msg: 'La solicitud es valida'
        })




    }catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Fallo la solicitud: Comuníquese con el administrador.",
            data: {
                error,
            },
        });
    }
}

const updateToken = async (req,res = response)=>{
    const  { uid } = req;
    // leer base de datos
    const dbUser = await User.findById(uid);




    const token = await generarJWT(uid, dbUser.name);

    return res.json({
        ok: true,
        uid,
        name: dbUser.name,
        email: dbUser.email,
        token,
    })
}


module.exports = {
    createUser,
    loginUser,
    updateToken,
}
