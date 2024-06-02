import RubroDTO from "../models/RubroDTO.js";
import { insertRubro, selectRubro, deleteRubroDB } from "../services/rubroService.js";

const getRubros = async (req, res) => {
    const rubros = await selectRubro()
    res.json(rubros)
};

const postRubro = async (req, res) => {
    const { nombre } = req.body;
  
    if (!nombre) {
      return res.status(400).json({ error: "El nombre es requerido" });
    }
  
    try {
      const rubro = await insertRubro(nombre);
      res.status(201).json({ message: "Rubro insertado correctamente" , id:rubro.idrubro});
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al insertar el rubro" });
    }
};

const deleteRubro = async (req,res) => {
  try {
    const response = await deleteRubroDB(req.body.idRubro);
    console.log(response);
    if (response === 0) {
        return res.status(400).json({ message: 'No se eliminó ningún rubro' });
    }
    return res.status(200).json({ message: 'Rubro eliminado correctamente' });
} catch (error) {
    console.error('Error en el controlador al eliminar el rubro:', error.message);
    return res.status(500).json({ message: 'Error interno del servidor' });
}
}

export {
    getRubros,
    postRubro,
    deleteRubro
};