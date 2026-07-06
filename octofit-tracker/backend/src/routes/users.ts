import { Router } from 'express';
import User from '../models/User.js';

const router = Router();

router.get('/', async (req, res) => {
  console.log('[users] GET /api/users request received');
  try {
    const users = await User.find().select('-__v').lean();
    console.log('[users] query returned', users.length, 'records');
    res.json({ users });
  } catch (error) {
    console.error('[users] query error', error);
    res.status(500).json({ error: 'Unable to fetch users' });
  }
});

export default router;
