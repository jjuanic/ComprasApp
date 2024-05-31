
import ProveedorDTO from "../models/ProveedorDTO.js";
import { insertRubroProveedor, selectRubroProveedor } from "../services/rubroProveedorService.js";
import { insertRubro, selectRubro } from "../services/rubroService.js";
import { insertProveedor } from "../services/proveedorService.js";

const getRubroProveedor = async (req, res) => {
    const rubroProveedor = await selectRubroProveedor()
    res.json(rubroProveedor)
};

const postRubroProveedor = async (req, res) => {
    // Lo que llega es 
    // {
    //     "proveedor": {
    //       "nombre": "Nombre de la Entidad",
    //       "descripcion": "Descripción de la Entidad",
    //       "otroCampo": "Otro Valor"
    //     },
    //     "rubros": [1, 2, 3, 4, 5]
    //   }

    console.log(req.body);
    const {
        nombre,
        numeroTelefono,
        codPostal,
        descripcion,
        email,
        CUIT,
        sitioWeb
    } = req.body.proveedor;

    const proveedorDTO = new ProveedorDTO(
        nombre,
        numeroTelefono,
        codPostal,
        descripcion,
        email,
        CUIT,
        sitioWeb
      );
    
    const idRubros = req.body.rubros

    console.log(idRubros);
  
    try {
      const respuesta = await insertProveedor(proveedorDTO);
      const idProveedor = respuesta
      idRubros.forEach(id => {
        insertRubroProveedor(id,idProveedor)
      });
      res.status(201).json({ message: "Proveedor con rubros insertados correctamente" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al insertar el rubro" });
    }
  };
  
export {
    postRubroProveedor,
    getRubroProveedor
};