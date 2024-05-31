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

  console.log(proveedorDTO);

  try {
    const ultimoId = await insertProveedor(proveedorDTO);
    console.log('El último ID insertado a la tabla de proveedores es: ',ultimoId);
    res.status(201).json({ message: "Proveedor insertado correctamente" , id: ultimoId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al insertar el proveedor" });
  }
};

export {
  getProveedores,
  postProveedores
};