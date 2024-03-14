import { NavigationProp } from "@react-navigation/native";

export function navigateToWorkoutProgram(
  navigation: NavigationProp<any>,
  id: number
) {
  navigation.navigate("WorkoutProgram", { workoutId: id });
}

export function navigateToBrowseWorkoutPrograms(
  navigation: NavigationProp<any>,
) {
  navigation.navigate("BrowseWorkoutPrograms");
}