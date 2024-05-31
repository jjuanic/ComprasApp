import { Router } from 'express';
import { getProveedores } from '../controllers/proveedorController.js';
const router = Router();

/* GET home page. */
router.get('/', getProveedores);

export default router;