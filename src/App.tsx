import React from "react";
import "./App.css";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import BrowseProgramScreen from "./screens/BrowseProgramsScreen/BrowseProgramScreen.tsx";
import WorkoutProgramScreen from "./screens/WorkoutProgramScreen/WorkoutProgramScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="BrowseWorkoutPrograms">
        <Stack.Screen
          name="BrowseWorkoutPrograms"
          component={BrowseProgramScreen}
        />
        <Stack.Screen name="WorkoutProgram" component={WorkoutProgramScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
