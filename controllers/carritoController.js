import {
  getCarritoService,
  postCarritoService,
  deleteCarritoService,
  getCarritoProductosService,
  postProductoInCarritoService,
  deleteProductoInCarritoService,
} from "../services/carrito.service.js";
import {
  getProductos,
  postProductos,
  editProductos,
  deleteProductos,
  productos,
} from "./productoController.js";
import { sendMail, sendSMS, sendWPP } from "../utils/sendMessage.js";
import CarritoDTO from "../dtos/CarritoDTO.js";
import { getUsuarioService, postUsuarioService, updateUsuario, getUsuarioByIDService, usuarioService } from "../services/usuario.service.js"
const {
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_NAME,
  SESSION_SECRET,
  MODO,
  MAIL,
  PASSW,
  TWILIOSID,
  TWILIOTOKEN,
  TWILIOPHONE,
  TWILIOWPP,
  MYPHONE,
} = process.env;
import serverResponse from "../utils/ServerResponse.js";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const getCarrito = async (req, resp) => {
  const id = req.params.id;
  if (id) {
    try {
      let carritoDAO = await getCarritoService(id);
      let carritoEnviar = new CarritoDTO(carritoDAO[0], req.user)
      //resp.status(200).render("carrito.ejs", { carritoEnviar });
      resp.status(200).json(new serverResponse(carritoEnviar, "Success"))
    } catch (err) {
      resp.status(500).json(new serverResponse(null, err, true, 500))
    }
  } else {
    let userEmail = req.user.email;
    const existingUser = await getUsuarioService(userEmail);
    if (existingUser.carrito == "nulo") {
      resp.sendFile(path.join(__dirname, "..", "public", "crearCarrito.html"));
    } else {
      resp.redirect(`/api/carrito/${req.user.carrito}`);
    }
  }
};

const postCarrito = async (req, resp) => {
  let userEmail = req.user.email;
  try {
    let carritoActual = await postCarritoService(userEmail);
    resp.status(200).json(new serverResponse(carritoActual, "Carrito Creado"))
  } catch (err) {
    resp.status(500).json(new serverResponse(null, err, true, 500))
  }
};

const deleteCarrito = async(req, resp) => {
  const id = String(req.params.id);
  try {
    const deletedCarrito = await deleteCarritoService(id);
    resp.status(200).json(new serverResponse(deletedCarrito, "Carrito Eliminado"))
  } catch (err) {
    resp.status(500).json(new serverResponse(null, err, true, 500))
  }
};

const getCarritoProductos = async (req, resp) => {
  const id = String(req.params.id);
  try {
    const prodsInCarrito = await getCarritoProductosService(id);
    resp.status(200).json(new serverResponse(prodsInCarrito, "Success"))
  } catch (err) {
    resp.status(500).json(new serverResponse(null, err, true, 500))
  }
};

const postProductoInCarrito = async (req, resp) => {
  const id = String(req.params.id);
  try {
    const postProdInCarr = await postProductoInCarritoService(id);
    resp.status(200).json(new serverResponse(postProdInCarr, "Success"))
  } catch (err) {
    resp.status(500).json(new serverResponse(null, err, true, 500))
  }
};

const deleteProductoInCarrito = async (req, resp) => {
  const idCarrito = String(req.params.id);
  const idProducto = String(req.params.id_prod);
  try {
    const deleteProdInCarr = await deleteProductoInCarritoService(
      idCarrito,
      idProducto
    );
    resp.status(200).json(new serverResponse(deleteProdInCarr, "Success"))
  } catch (err) {
    resp.status(500).json(new serverResponse(null, err, true, 500))
  }
};

const initPedido = async (req, res) => {
  const userEmail = req.user.email;
  const existingUser = await getUsuarioService(userEmail);
  const productosInCarr = await getCarritoService(existingUser.carrito);
  try {
    const asunto = `Nuevo pedido de ${req.user.nombre}, ${userEmail}`;
    sendMail(asunto, productosInCarr);
    sendWPP(`Nuevo pedido de ${req.user.nombre}, ${userEmail}`, MYPHONE);
    sendSMS("Pedido Relizado Correctamente", existingUser.telefono);
    res.status(200).json(new serverResponse(asunto, "Pedido Realizado"))
  } catch (err) {
    res.status(500).json(new serverResponse(null, err, true, 500))
  }
};

export {
  getCarrito,
  postCarrito,
  deleteCarrito,
  getCarritoProductos,
  postProductoInCarrito,
  deleteProductoInCarrito,
  initPedido,
};
