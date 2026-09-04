import mongoose from 'mongoose';
import { Activity } from '../models/Activity.js';
import { LeaderboardEntry } from '../models/LeaderboardEntry.js';
import { Team } from '../models/Team.js';
import { User } from '../models/User.js';
import { Workout } from '../models/Workout.js';

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
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Team.deleteMany({}),
      User.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const teams = await Team.insertMany([
      { name: 'Velocity Vipers', mascot: 'Viper', city: 'Austin', memberCount: 24 },
      { name: 'Summit Sprinters', mascot: 'Mountain Goat', city: 'Denver', memberCount: 18 },
      { name: 'Harbor HIIT Crew', mascot: 'Marlin', city: 'Seattle', memberCount: 21 },
    ]);

    const users = await User.insertMany([
      {
        username: 'maya.moves',
        email: 'maya@example.com',
        displayName: 'Maya Chen',
        fitnessGoal: 'Build endurance for a half marathon',
        favoriteActivity: 'Running',
        joinedAt: new Date('2026-01-12'),
      },
      {
        username: 'leo.lifts',
        email: 'leo@example.com',
        displayName: 'Leo Martin',
        fitnessGoal: 'Increase functional strength',
        favoriteActivity: 'Strength training',
        joinedAt: new Date('2026-02-03'),
      },
      {
        username: 'nora.flow',
        email: 'nora@example.com',
        displayName: 'Nora Patel',
        fitnessGoal: 'Improve mobility and recovery',
        favoriteActivity: 'Yoga',
        joinedAt: new Date('2026-03-19'),
      },
    ]);

    await Activity.insertMany([
      {
        user: users[0]._id,
        team: teams[0]._id,
        activityType: 'Outdoor run',
        durationMinutes: 52,
        caloriesBurned: 610,
        activityDate: new Date('2026-08-30T07:30:00Z'),
      },
      {
        user: users[1]._id,
        team: teams[1]._id,
        activityType: 'Kettlebell circuit',
        durationMinutes: 45,
        caloriesBurned: 480,
        activityDate: new Date('2026-08-31T18:00:00Z'),
      },
      {
        user: users[2]._id,
        team: teams[2]._id,
        activityType: 'Recovery yoga',
        durationMinutes: 38,
        caloriesBurned: 190,
        activityDate: new Date('2026-09-01T06:45:00Z'),
      },
    ]);

    await LeaderboardEntry.insertMany([
      { user: users[0]._id, team: teams[0]._id, rank: 1, points: 1420, weeklyMinutes: 215 },
      { user: users[1]._id, team: teams[1]._id, rank: 2, points: 1310, weeklyMinutes: 188 },
      { user: users[2]._id, team: teams[2]._id, rank: 3, points: 980, weeklyMinutes: 162 },
    ]);

    await Workout.insertMany([
      {
        title: 'Tempo Builder Run',
        focusArea: 'Cardio endurance',
        difficulty: 'intermediate',
        estimatedMinutes: 40,
        recommendedForGoal: 'Build endurance for a half marathon',
      },
      {
        title: 'Total Body Strength Ladder',
        focusArea: 'Functional strength',
        difficulty: 'advanced',
        estimatedMinutes: 35,
        recommendedForGoal: 'Increase functional strength',
      },
      {
        title: 'Mobility Reset Flow',
        focusArea: 'Mobility and recovery',
        difficulty: 'beginner',
        estimatedMinutes: 25,
        recommendedForGoal: 'Improve mobility and recovery',
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
