import { Admin } from "../config.js";
import crypto from "crypto";
import Producto from "../classes/producto.class.js";

const productoMap = {};

const getProducto = async (id) => {
  if (!productoMap[id]) throw new Error("Producto no existe");
  return productoMap[id];
};

const getProductos = async (id) => {
  const productos = Object.values(productoMap);
  return productos;
};

const postProductos = async ({ datos }) => {
  if (Admin) {
    const producto = datos;
    const id = crypto.randomBytes(10).toString("hex");
    const nuevoProducto = new Producto(id, producto);
    productoMap[id] = nuevoProducto;

    return nuevoProducto;
  } else {
    throw new Error("No tiene permiso para realizar esta acción");
  }
};

const editProductos = async (id, { datos }) => {
  const producto = { datos };
  if (Admin) {
    if (!productoMap[id]) throw new Error("Producto no existe");
    const productoActualizado = new Persona(id, producto);
    productoMap[id] = productoActualizado;
    return productoActualizado;
  } else {
    throw new Error("No tiene permiso para realizar esta acción");
  }
};

const deleteProductos = async (id) => {
  if (Admin) {
    if (!productoMap[id]) throw new Error("Producto no existe");
    const productoBorrado = productoMap[id];
    delete productoMap[id];
    return productoBorrado;
  } else {
    throw new Error("No tiene permiso para realizar esta acción");
  }
};

export { getProducto, getProductos, postProductos, editProductos, deleteProductos };
