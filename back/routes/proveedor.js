import { Router } from 'express';
import { getProveedores, postProveedores } from '../controllers/proveedorController.js';
import { getRubroYProveedor, postRubroProveedor } from '../controllers/rubroProveedorController.js';
const router = Router();

/* GET home page. */
router.get('/', getProveedores);
router.post('/', postProveedores);
router.post('/rubros', postRubroProveedor);
router.get('/rubros', getRubroYProveedor)

export default router;