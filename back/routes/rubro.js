import { Router } from 'express';
import { deleteRubro, getRubros, postRubro } from '../controllers/rubroController.js';
const router = Router();

/* GET home page. */
router.get('/', getRubros);
router.post('/', postRubro);
router.post ('/eliminar', deleteRubro);

export default router;