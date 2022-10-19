import { Router } from 'express'
import logger from '../logger/logger.js';
import productosRouter from './productos.rutas.js'
import carritoRouter from './carrito.rutas.js'
import usuarioRouter from './usuario.rutas.js'
import serverResponse from '../utils/ServerResponse.js';

const router = Router()

// router.get('/', (req, res) => {
//     res.redirect("/api/home")
// })

router.use('/productos', productosRouter)
router.use('/carrito', carritoRouter)
router.use('/', usuarioRouter)

//FAIL ROUTE
router.get("*", function (req, res) {
    //res.status(404).render("routing-error", { error: -2, descripcion: `ruta '${req.path}' metodo '${req.method}' no implementada` })
    res.status(404).json(new serverResponse({ error: -2, descripcion: `ruta '${req.path}' metodo '${req.method}' no implementada` }, "routing-error", true, 404))
    logger.warn("Acceso a Ruta no Definida")
});

export default router