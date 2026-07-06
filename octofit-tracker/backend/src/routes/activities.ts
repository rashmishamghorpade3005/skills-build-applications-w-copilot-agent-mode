import { Router } from 'express';
import Activity from '../models/Activity.js';

const router = Router();

router.get('/', async (req, res) => {
  console.log('[activities] GET /api/activities request received');
  try {
    const activities = await Activity.find()
      .populate('user', 'name email')
      .select('-__v')
      .lean();
    console.log('[activities] query returned', activities.length, 'records');
    res.json({ activities });
  } catch (error) {
    console.error('[activities] query error', error);
    res.status(500).json({ error: 'Unable to fetch activities' });
  }
});

export default router;
