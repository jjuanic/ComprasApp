import { Router } from 'express';
import { getProveedores, postProveedores } from '../controllers/proveedorController.js';
const router = Router();

/* GET home page. */
router.get('/', getProveedores);
router.post('/', postProveedores);

export default router;