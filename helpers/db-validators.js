const Role = require('../models/rol');
const Usuario = require('../models/usuario');

// Verifcar rol en DB
const esRolValido = async ( rol = '' ) => {
    const existeRol = await Role.findOne( { rol });
    if ( !existeRol ) {
        throw new Error(`El rol ${ rol } no está registrado en la BD`);
    }
}

// Verificar si el correo existe
const validaCorreoBD = async(correo = '') => {

    const existeEmail = await Usuario.findOne( { correo } );
    if ( existeEmail ) {
        throw new Error(`El correo ${ correo } ya se encuentra registrado`);
    }
}

// Verifica si ID existe en BD
const existeUsuarioId = async( id ) => {

    const existeUsuario = await Usuario.findById( id );
    if ( !existeUsuario ) {
        throw new Error(`El ID ${ id } no existe`);
    }
} 

module.exports = {
    esRolValido,
    validaCorreoBD,
    existeUsuarioId
}