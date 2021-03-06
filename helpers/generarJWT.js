
const jwt = require('jsonwebtoken');
const db = require('../database/db');

const user = db.user;



const generarJWT = (uid='')=>{

    return new Promise((resolve,reject)=>{

        const payload ={uid};

        jwt.sign(payload,process.env.SECRETORPRIVATEKEY,{
            expiresIn:'365d'
        },(err,token)=>{
            if(err){
                console.log(err);
                reject('No se pudo guardar el token')
            }else{
                resolve(token);
            }
        })

    })
}

const comprobarJWT = async( token = '') => {

    try {

        if(  token.length < 10 ) {
            return null;
        }
        const {uid}=jwt.verify(token,process.env.SECRETORPRIVATEKEY);
        const usuario = await user.findByPk(uid);

        if ( usuario ) {
                return usuario;
            
        } else {
            return null;
        }

    } catch (error) {
        return null;
    }

}

const comprobarJWTSocket = ( token = '' ) => {

    try {

        const { uid } = jwt.verify( token,process.env.SECRETORPRIVATEKEY );
        return [ true, uid];

    } catch (error) {
        return [ false, null ];
    }

}

module.exports={
    generarJWT,
    comprobarJWT,
    comprobarJWTSocket
}