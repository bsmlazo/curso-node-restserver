const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const {
    esRolValido,
    validaCorreoBD,
    existeUsuarioId
} = require('../helpers/db-validators');

const {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch
} = require('../controllers/usuarios');

const router = Router();

router.get('/', usuariosGet );

router.put('/:id', [
    check('id', 'ID no válido').isMongoId(),
    check('id').custom( existeUsuarioId ),
    check('rol').custom( esRolValido ),
    validarCampos
], usuariosPut );

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio y debe tener al menos 6 caracteres').isLength({ min: 6}),
    check('correo').custom( validaCorreoBD ),
    check('rol').custom( esRolValido ),
    // check('rol', 'Rol inválido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    validarCampos
], usuariosPost );

router.patch('/', usuariosPatch );

router.delete('/:id', [
    check('id', 'ID no válido').isMongoId(),
    check('id').custom( existeUsuarioId ),
    validarCampos
], usuariosDelete );

module.exports = router;