import ContenedorMongoDb from "../../contenedores/ContenedorMongoDb.js";
import mongoose from "mongoose";
let instance = null

export default class ContenedorProductoMongoDb extends ContenedorMongoDb {
  constructor() {
    const productoScherma = new mongoose.Schema(
      {
        nombre: { type: String },
        descripcion: { type: String },
        codigo: { type: Number, unique: true },
        foto: { type: String },
        precio: { type: Number },
        stock: { type: Boolean },
      },
      { timestamps: true }
    );

    super("productos", productoScherma);
  }

  static getInstance() {
    if (!instance) {
      instance = new ContenedorProductoMongoDb();
    }
    return instance;
  }
}
