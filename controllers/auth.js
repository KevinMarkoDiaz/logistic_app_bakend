const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/UserModel');
const { createJWT } = require('../helpers/jwt');

const createUser = async (req, res = response) => {
    const { email, password } = req.body
    try {
        let user = await User.findOne({ email })

        if (user) {
            return res.status(500).json({
                ok: false,
                msg: 'Existe un usuario registrado con este email'
            })
        }
        user = new User(req.body);
        //Encriptar contraseña 
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();
         //Generar JWT
         const token = await createJWT(user.id, user.name)

        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            role: user.role,
            token
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
};

const renewToken = async (req, res = response) => {
    const {uid, name} = req

    const newToken = await createJWT(uid, name );

    res.json({
        ok: true,
        uid,
        name,
        newToken
    })
}

const loginUser = async (req, res = response) => {
    const { email, password } = req.body
    try {
        let user = await User.findOne({ email })

        if (!user) {
            return res.status(500).json({
                ok: false,
                msg: 'El usuario con este email no exite'
            })
        }
        //Confirmar password 
        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrecta'
            })
        }
        //Generar JWT
        const token = await createJWT(user.id, user.name)
        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            role:user.role,
            token
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

module.exports = {
    createUser,
    renewToken,
    loginUser
};