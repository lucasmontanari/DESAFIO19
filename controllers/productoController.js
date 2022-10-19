import {
  getProductosService,
  postProductosService,
  editProductosService,
  deleteProductosService,
  productosService,
} from "../services/productos.service.js";
import ProductoDTO from "../dtos/ProductosDTO.js";
import { Admin } from "../config.js";
import serverResponse from "../utils/ServerResponse.js";
const productos = productosService;

const getProductos = async (req, resp) => {
  const id = req.params.id;
  try {
    const productosDAO = await getProductosService(id);
    const productosEnviar = new ProductoDTO(productosDAO).productos
    //resp.status(200).render("productos", { productosEnviar });
    resp.status(200).json(new serverResponse(productosEnviar, "Success"))
  } catch (err) {
    resp.status(500).json(new serverResponse(null, err, true, 500))
  }
};

const postProductos = async (req, resp) => {
  const producto = req.body;
  if (Admin) {
    try {
      const productosEnviar = await postProductosService(producto);
      resp.status(200).json(new serverResponse(productosEnviar, "Success"))
    } catch (err) {
      resp.status(500).json(new serverResponse(null, err, true, 500))
    }
  } else {
    resp.status(401).json(new serverResponse(null, `ruta '${req.path}' metodo '${req.method}' no autorizada`, true, -1));
  }
};

const editProductos = async (req, resp) => {
  const producto = req.body;
  if (Admin) {
    const id = String(req.params.id);
    try {
      const productosEnviar = await editProductosService(producto, id);
      resp.status(200).json(new serverResponse(productosEnviar, "Success"))
    } catch (err) {
      resp.status(500).json(new serverResponse(null, err, true, 500))
    }
  } else {
    resp.status(401).json(new serverResponse(null, `ruta '${req.path}' metodo '${req.method}' no autorizada`, true, -1));
  }
};

const deleteProductos = async (req, resp) => {
  const id = String(req.params.id);
  if (Admin) {
    try {
      const productosEnviar = await deleteProductosService(id);
      resp.status(200).json(new serverResponse(productosEnviar, "Success"))
    } catch (err) {
      resp.status(500).json(new serverResponse(null, err, true, 500))
    }
  } else {
    resp.status(401).json(new serverResponse(null, `ruta '${req.path}' metodo '${req.method}' no autorizada`, true, -1));
  }
};

export {
  getProductos,
  postProductos,
  editProductos,
  deleteProductos,
  productos,
};
