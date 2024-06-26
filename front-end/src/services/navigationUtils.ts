import { NavigationProp } from "@react-navigation/native";

export function navigateToWorkoutProgram(
  navigation: NavigationProp<any>,
  id: number
) {
  navigation.navigate("WorkoutProgram", { workoutId: id });
}

export function navigateToBrowseWorkoutPrograms(
  navigation: NavigationProp<any>
) {
  navigation.navigate("Main", {
    screen: "BrowseProgramScreen",
  });
}

export function navigateToLogIn(navigation: NavigationProp<any>) {
  navigation.navigate("LoginScreen");
}

export function navigateToAddWorkoutProgram(navigation: NavigationProp<any>) {
  navigation.navigate("AddWorkoutProgramScreen");
}

export function navigateToEditProfile(navigation: NavigationProp<any>) {
  navigation.navigate("EditProfileScreen");
}
