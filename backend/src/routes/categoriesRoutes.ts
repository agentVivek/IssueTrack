import { Router } from 'express';
import { requireAuth } from '../middlewares/authMiddleware.js';
import { 
  getAllCategories, 
  getCategoryById, 
  addCategory, 
  deleteCategory 
} from '../controllers/categoriesControllers.js';

const router = Router();

router.get('/', requireAuth, getAllCategories);
router.get('/:id', requireAuth, getCategoryById);

router.post('/', requireAuth, addCategory);
router.delete('/:id', requireAuth, deleteCategory);

export default router;