import { ImageSourcePropType } from "react-native";

type BodyPart = { id: number; name: string };
type BodyPartList = BodyPart[];
type Exercises = {
  id: number;
  name: string;
  description: string;
  muscle_groups: { id: number; name: string }[];
  body_parts: BodyPartList;
};
type ExerciseList = Exercises[];
type WorkoutProgram = {
  id: number;
  name: string;
  description: string;
  body_parts: BodyPartList;
  exercises: ExerciseList;
  owner: { id: string; email: string; username: string };
};
type WorkoutProgramList = WorkoutProgram[];

type WorkoutProgramForPOST = {
  name: string;
  description: string;
  exercises: number[];
  owner: string;
};

type NewUser = {
  id: string;
  username: string;
  email: string;
};

type User = {
  id: string;
  username: string;
  email: string;
  profile_pic: string;
  workout_programs: { id: number; name: string }[];
  personal_bests: {
    bench_press: string | null;
    squats: string | null;
    deadlift: string | null;
  };
  favoriteWorkouts: { id: number; name: string; description: string }[];
};

type FilterButtonProps = {
  label: string;
  onFilterSelect: (filter: string) => void;
};

type Nutrient = {
  name: string;
  amount: number;
  unit: string;
  percentOfDailyNeeds: number;
};

type EstimatedCost = {
  value: number;
  unit: string;
};

type NutritionProperty = {
  name: string;
  amount: number;
  unit: string;
};

type Flavonoid = {
  name: string;
  amount: number;
  unit: string;
};

type CaloricBreakdown = {
  percentProtein: number;
  percentFat: number;
  percentCarbs: number;
};

type WeightPerServing = {
  amount: number;
  unit: string;
};

type FoodItem = {
  id: number;
  original: string;
  originalName: string;
  name: string;
  amount: number;
  unit: string;
  unitShort: string;
  unitLong: string;
  possibleUnits: string[];
  estimatedCost: EstimatedCost;
  consistency: string;
  shoppingListUnits: string[];
  aisle: string;
  image: string;
  meta: any[]; // Assuming meta can be of any type
  nutrition: {
    nutrients: Nutrient[];
    properties: NutritionProperty[];
    flavonoids: Flavonoid[];
    caloricBreakdown: CaloricBreakdown;
    weightPerServing: WeightPerServing;
  };
  categoryPath: string[];
};

export type {
  BodyPart,
  BodyPartList,
  WorkoutProgram,
  WorkoutProgramList,
  WorkoutProgramForPOST,
  Exercises,
  ExerciseList,
  NewUser,
  User,
  FilterButtonProps,
  FoodItem,
  Nutrient,
  EstimatedCost,
  NutritionProperty,
  Flavonoid,
  CaloricBreakdown,
  WeightPerServing,
};
