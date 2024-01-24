import express from "express";
import {registrar, autenticar, confirmar, olvidePassword, confirmarToken, nuevoPassword, perfil} from '../controllers/usuarioController.js'
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router()


//Creacion, registro y confirmacion de usuarios 
router.post('/', registrar); //Crea un nuevo usuario

router.post('/login', autenticar); //Autenticar el usuario
router.get('/confirmar/:token', confirmar) //Confirmar usuario

router.post('/olvide-password', olvidePassword) //Solicitar token para cambiar la password
router.get('/olvide-password/:token', confirmarToken) //Confirmar el token para cambiar la password
router.post('/olvide-password/:token', nuevoPassword) //Almacenar la nueva password

router.get('/perfil', checkAuth, perfil)

export default router