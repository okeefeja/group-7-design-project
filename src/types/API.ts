import { ImageSourcePropType } from 'react-native';
type Exercises = { id: number; name: string; description: string };
type ExerciseList = Exercises[];
type WorkoutProgram = {
  id: number;
  name: string;
  description: string;
  exercises: ExerciseList;
};
type WorkoutProgramList = WorkoutProgram[];

interface CustomHeaderProps {
  title: string;
  userName: string;
  profilePic: ImageSourcePropType;
}

export type { WorkoutProgram, WorkoutProgramList, Exercises, ExerciseList, CustomHeaderProps };
