import { Router } from 'express';
import { requireAuth } from '../middlewares/authMiddleware.js';
import { 
  getAllZones, 
  getZoneById, 
  addZone, 
  deleteZone 
} from '../controllers/zonesControllers.js';

const router = Router();

router.get('/', requireAuth, getAllZones);
router.get('/:id', requireAuth, getZoneById);

router.post('/', requireAuth, addZone);
router.delete('/:id', requireAuth, deleteZone);

export default router;