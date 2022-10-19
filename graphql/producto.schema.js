import { buildSchema } from "graphql";

const productoSchema = buildSchema(`
    input ProductoInput{
        nombre: String,
        descripcion: String,
        codigo: Int,
        foto: String,
        precio: Float,
        stock: Int
    }
    type Producto{
        id: ID!,
        nombre: String,
        descripcion: String,
        codigo: Int,
        foto: String,
        precio: Float,
        stock: Int
    }
    type Query{
        getProducto(id: ID!): Producto,
        getProductos(id: ID!): [Producto]
    }
    type Mutation{
        postProducto(datos: ProductoInput): Producto,
        updateProducto(id: ID!, datos: ProductoInput): Producto,
        deleteProducto(id: ID!): Producto
    }
`);

export default productoSchema;
