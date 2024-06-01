import { Router } from 'express';
import { getProveedores, postProveedores } from '../controllers/proveedorController.js';
import { deleteRubroProveedor, getRubroYProveedor, postRubroProveedor, updateRubroProveedor } from '../controllers/rubroProveedorController.js';
const router = Router();

/* GET home page. */
router.get('/', getProveedores);
router.post('/', postProveedores);
router.post('/rubros', postRubroProveedor);
router.get('/rubros', getRubroYProveedor);
router.post('/rubros/eliminar', deleteRubroProveedor)
router.post('/rubros/actualizar', updateRubroProveedor)

export default router;