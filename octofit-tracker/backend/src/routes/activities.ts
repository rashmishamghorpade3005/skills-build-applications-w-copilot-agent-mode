import { Router } from 'express';
import Activity from '../models/Activity.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const activities = await Activity.find()
      .populate('user', 'name email')
      .select('-__v')
      .lean();
    res.json({ activities });
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch activities' });
  }
});

export default router;
