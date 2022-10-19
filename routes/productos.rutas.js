import { Router } from 'express'
import { getProducto, getProductos, postProductos, editProductos, deleteProductos } from '../controllers/producto.controller.js'
import { graphqlHTTP } from "express-graphql";
import productoSchema from '../graphql/producto.schema.js';
import checkAuth from '../middleware/checkLogueo.js'
const router = Router()

//PRODUCTOS
router.get('/', graphqlHTTP({productoSchema, getProductos, graphiql: true }))
router.get('/:id', graphqlHTTP({productoSchema, getProducto, graphiql: true }))
router.post('/', graphqlHTTP({productoSchema, postProductos, graphiql: true }))
router.put('/:id', graphqlHTTP({productoSchema, editProductos, graphiql: true }))
router.delete('/:id', graphqlHTTP({productoSchema, deleteProductos, graphiql: true }))

export default router