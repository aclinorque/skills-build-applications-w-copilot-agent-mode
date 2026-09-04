import { Schema, model } from 'mongoose';

const workoutSchema = new Schema(
  {
    title: { type: String, required: true },
    focusArea: { type: String, required: true },
    difficulty: { type: String, required: true, enum: ['beginner', 'intermediate', 'advanced'] },
    estimatedMinutes: { type: Number, required: true, min: 5 },
    recommendedForGoal: { type: String, required: true },
  },
  { timestamps: true },
);

export const Workout = model('Workout', workoutSchema);