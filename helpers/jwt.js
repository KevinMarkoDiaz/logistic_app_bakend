const jwt = require('jsonwebtoken');

const createJWT = (uid, name)=>{
    return new Promise((res, rej)=>{
        const payload = {uid, name};
        jwt.sign(payload, process.env.SECRET_JWT_SEED,{
            expiresIn: '24h'
        }, (err, token)=>{
            if (err) {
                console.log(err)
                rej('No se pudo generar el token')
            }
            res(token);
        })
    })
};

module.exports = {
    createJWT
};