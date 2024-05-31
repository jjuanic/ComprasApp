import ProveedorDTO from "../models/ProveedorDTO.js";
import { selectProveedores, insertProveedor } from "../services/proveedorService.js";

const getProveedores = async (req, res) => {
    const proveedores = await selectProveedores()
    res.json(proveedores)
};

const postProveedores = async (req, res) => {
  const {
    nombre,
    numeroTelefono,
    codPostal,
    descripcion,
    email,
    CUIT,
    sitioWeb
  } = req.body;

  const proveedorDTO = new ProveedorDTO(
    nombre,
    numeroTelefono,
    codPostal,
    descripcion,
    email,
    CUIT,
    sitioWeb
  );

  await insertProveedor(proveedorDTO)
  res.json(proveedores)
};

export {
  getProveedores,
  postProveedores
};