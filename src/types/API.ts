type Exercises = { id: number; name: string; description: string };
type ExerciseList = Exercises[];
type WorkoutProgram = {
  id: number;
  name: string;
  description: string;
  exercises: ExerciseList;
};
type WorkoutProgramList = WorkoutProgram[];

export type { WorkoutProgram, WorkoutProgramList, Exercises, ExerciseList };
