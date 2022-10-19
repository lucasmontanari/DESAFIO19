import crypto from "crypto";
import Carrito from "../classes/carrito.class.js";

const carritoMap = {};

const getCarrito = async (id) => {
  if (!carritoMap[id]) throw new Error("Carrito no existe");
  return carritoMap[id];
};

const getCarritos = async (id) => {
  const carritos = Object.values(carritoMap);
  return carritos;
};

const postCarrito = async ({ datos }) => {
  const carrito = datos;
  const id = crypto.randomBytes(10).toString("hex");
  const nuevoCarrito = new Carrito(id, carrito);
  carritoMap[id] = nuevoCarrito;
  return nuevoCarrito;
};

const editCarrito = async (id, { datos }) => {
  const carrito = { datos };
  if (!carritoMap[id]) throw new Error("Carrito no existe");
  const carritoActualizado = new Persona(id, carrito);
  carritoMap[id] = carritoActualizado;
  return carritoActualizado;
};

const deleteCarrito = async (id) => {
  if (!carritoMap[id]) throw new Error("Carrito no existe");
  const carritoBorrado = carritoMap[id];
  delete carritoMap[id];
  return carritoBorrado;
};

export { getCarrito, getCarritos, postCarrito, editCarrito, deleteCarrito };
