import mongoose from 'mongoose';
import User from '../models/User.js';
import Team from '../models/Team.js';
import Activity from '../models/Activity.js';
import Workout from '../models/Workout.js';
import LeaderboardEntry from '../models/LeaderboardEntry.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');
    console.log('Seed the octofit_db database with test data');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Workout.deleteMany({}),
      LeaderboardEntry.deleteMany({})
    ]);

    const users = await User.create([
      {
        name: 'Asha Patel',
        email: 'asha.patel@example.com',
        role: 'athlete',
        goals: ['Run 20km per week', 'Improve endurance']
      },
      {
        name: 'Leo Carter',
        email: 'leo.carter@example.com',
        role: 'athlete',
        goals: ['Build strength', 'Complete a triathlon']
      },
      {
        name: 'Mia Johnson',
        email: 'mia.johnson@example.com',
        role: 'coach',
        goals: ['Support team training', 'Optimize recovery']
      },
      {
        name: 'Noah Kim',
        email: 'noah.kim@example.com',
        role: 'athlete',
        goals: ['Hit 10,000 steps daily', 'Increase flexibility']
      }
    ]);

    const teams = await Team.create([
      {
        name: 'Coastal Sprinters',
        description: 'A high-energy squad focused on speed and outdoor runs.',
        members: [users[0]._id, users[1]._id]
      },
      {
        name: 'Recovery Champions',
        description: 'A team that balances strength with mobility and rest.',
        members: [users[2]._id, users[3]._id]
      }
    ]);

    const workouts = await Workout.create([
      {
        name: 'Morning HIIT Blast',
        focusArea: 'Cardio',
        durationMinutes: 35,
        exercises: ['Jump squats', 'Burpees', 'Mountain climbers', 'High knees'],
        difficulty: 'Intermediate'
      },
      {
        name: 'Strength & Stability',
        focusArea: 'Strength',
        durationMinutes: 45,
        exercises: ['Deadlifts', 'Push-ups', 'Plank holds', 'Dumbbell lunges'],
        difficulty: 'Advanced'
      },
      {
        name: 'Recovery Flow',
        focusArea: 'Mobility',
        durationMinutes: 30,
        exercises: ['Yoga stretch', 'Foam rolling', 'Hip openers', 'Breathing drills'],
        difficulty: 'Beginner'
      },
      {
        name: 'Endurance Builder',
        focusArea: 'Endurance',
        durationMinutes: 60,
        exercises: ['Stationary bike', 'Rowing', 'Core circuits', 'Cool down walk'],
        difficulty: 'Intermediate'
      }
    ]);

    const activities = await Activity.create([
      {
        type: 'Running',
        durationMinutes: 50,
        caloriesBurned: 520,
        user: users[0]._id,
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
      },
      {
        type: 'Swimming',
        durationMinutes: 40,
        caloriesBurned: 420,
        user: users[1]._id,
        date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
      },
      {
        type: 'Strength training',
        durationMinutes: 55,
        caloriesBurned: 480,
        user: users[3]._id,
        date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
      },
      {
        type: 'Yoga',
        durationMinutes: 35,
        caloriesBurned: 180,
        user: users[2]._id,
        date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000)
      }
    ]);

    const leaderboard = await LeaderboardEntry.create([
      {
        user: users[1]._id,
        rank: 1,
        points: 1480,
        weeklyGoalCompletion: 95
      },
      {
        user: users[0]._id,
        rank: 2,
        points: 1320,
        weeklyGoalCompletion: 88
      },
      {
        user: users[3]._id,
        rank: 3,
        points: 1180,
        weeklyGoalCompletion: 82
      },
      {
        user: users[2]._id,
        rank: 4,
        points: 1020,
        weeklyGoalCompletion: 78
      }
    ]);

    console.log(`Seeded ${users.length} users, ${teams.length} teams, ${activities.length} activities, ${workouts.length} workouts, ${leaderboard.length} leaderboard entries`);
    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
