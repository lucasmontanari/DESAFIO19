import { buildSchema } from "graphql";

const carritoSchema = buildSchema(`
    input CarritoInput {
        productos: [Producto],
    }
    type Producto {
        id: ID!,
        nombre: String,
        descripcion: String,
        codigo: Int,
        foto: String,
        precio: Float,
        stock: Int,
    }
    type Carrito{
        id: ID!,
        productos: [Producto]
    }
    type Query{
        getCarrito(id: ID!): Producto,
        getCarritos(id: ID!): [Producto]
    }
    type Mutation{
        postCarrito(datos: ProductoInput): Producto,
        updateCarrito(id: ID!, datos: ProductoInput): Producto,
        deleteCarrito(id: ID!): Producto
    }
`);

export default carritoSchema;