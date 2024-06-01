import { Router } from 'express';
import { getProveedores, postProveedores } from '../controllers/proveedorController.js';
import { deleteRubroProveedor, getRubroYProveedor, postRubroProveedor } from '../controllers/rubroProveedorController.js';
const router = Router();

/* GET home page. */
router.get('/', getProveedores);
router.post('/', postProveedores);
router.post('/rubros', postRubroProveedor);
router.get('/rubros', getRubroYProveedor);
router.post('/rubros/eliminar', deleteRubroProveedor)

export default router;