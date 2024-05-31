import { selectProveedores, insertProveedor } from "../services/proveedorService.js";

const getProveedores = async (req, res) => {
    const proveedores = await selectProveedores()
  };

  export {
    getProveedores
  };