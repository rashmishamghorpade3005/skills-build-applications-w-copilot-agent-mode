import { Router } from 'express';
import LeaderboardEntry from '../models/LeaderboardEntry.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const leaderboard = await LeaderboardEntry.find()
      .populate('user', 'name email')
      .sort('rank')
      .select('-__v')
      .lean();
    res.json({ leaderboard });
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch leaderboard' });
  }
});

export default router;
