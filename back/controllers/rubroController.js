import RubroDTO from "../models/RubroDTO.js";
import { insertRubro, selectRubro } from "../services/rubroService.js";

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
      await insertRubro(nombre);
      res.status(201).json({ message: "Rubro insertado correctamente" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al insertar el rubro" });
    }
  };
  
export {
    getRubros,
    postRubro
};