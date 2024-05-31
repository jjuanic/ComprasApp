import { Router } from 'express';
import { getProveedores, postProveedores } from '../controllers/proveedorController.js';
import { postRubroProveedor } from '../controllers/rubroProveedorController.js';
const router = Router();

/* GET home page. */
router.get('/', getProveedores);
router.post('/', postProveedores);
router.post('/rubros', postRubroProveedor);

export default router;