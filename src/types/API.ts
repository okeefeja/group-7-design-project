import { ImageSourcePropType } from "react-native";

type BodyPart = { id: number; name: string };
type BodyPartList = BodyPart[];
type Exercises = {
  id: number;
  name: string;
  description: string;
  muscle_groups: { id: number; name: string }[];
};
type ExerciseList = Exercises[];
type WorkoutProgram = {
  id: number;
  name: string;
  description: string;
  body_parts: BodyPartList;
  exercises: ExerciseList;
};
type WorkoutProgramList = WorkoutProgram[];

interface CustomHeaderProps {
  title: string;
  userName: string;
  profilePic: ImageSourcePropType;
}

type FilterButtonProps = {
  label: string;
  onFilterSelect: (filter: string) => void;
};

export type {
  BodyPart,
  BodyPartList,
  WorkoutProgram,
  WorkoutProgramList,
  Exercises,
  ExerciseList,
  CustomHeaderProps,
  FilterButtonProps,
};
