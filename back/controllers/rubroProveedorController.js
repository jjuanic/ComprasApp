
import ProveedorDTO from "../models/ProveedorDTO.js";
import { deleteAllRubroProveedor, insertRubroProveedor, selectProveedoresYRubros } from "../services/rubroProveedorService.js";
import { insertRubro, selectRubro } from "../services/rubroService.js";
import { deleteProveedor, insertProveedor, updateProveedor } from "../services/proveedorService.js";

const getRubroYProveedor = async (req, res) => {
    const rubroProveedor = await selectProveedoresYRubros()
    res.json(rubroProveedor)
};

const deleteRubroProveedor = async (req,res) => {
  await deleteAllRubroProveedor(req.body.idProveedor);
  await deleteProveedor(req.body.idProveedor)
  res.status(201).json({ message: "Proveedor y rubros correspondientes eliminados" });
}

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
      const idProveedor = await insertProveedor(proveedorDTO);
      console.log('Id del Proveedor: ', idProveedor);
      await Promise.all(idRubros.map(id => insertRubroProveedor(id, idProveedor)));
      res.status(201).json({ message: "Proveedor con rubros insertados correctamente", idProveedor: idProveedor });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al insertar el rubro" });
    }
  };

  const updateRubroProveedor = async (req, res) => {
    const {
        idProveedor,
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
    
    const idRubros = req.body.rubros;

    console.log(idRubros);
  
    try {
        await updateProveedor(idProveedor, proveedorDTO);
        console.log('Proveedor actualizado con id: ', idProveedor);

        // Primero eliminamos los rubros actuales del proveedor
        await deleteAllRubroProveedor(idProveedor);

        // Luego insertamos los nuevos rubros
        await Promise.all(idRubros.map(id => insertRubroProveedor(id, idProveedor)));

        res.status(200).json({ message: "Proveedor con rubros actualizados correctamente", idProveedor: idProveedor });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al actualizar el rubro" });
    }
};
  
export {
    postRubroProveedor,
    getRubroYProveedor,
    deleteRubroProveedor,
    updateRubroProveedor
};