import { Router } from 'express';
import { getRubros, postRubro } from '../controllers/rubroController.js';
const router = Router();

/* GET home page. */
router.get('/', getRubros);
router.post('/', postRubro);

export default router;