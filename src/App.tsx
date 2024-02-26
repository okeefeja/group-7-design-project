import React from "react";
import "./App.css";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import BrowseProgramScreen from "./screens/BrowseProgramsScreen/BrowseProgramScreen.tsx";
import WorkoutProgramScreen from "./screens/WorkoutProgramScreen/WorkoutProgramScreen";
import CustomHeader from "./components/HeaderBar/HeaderBar";
import defaultPic from "../assets/Logo.png";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="BrowseWorkoutPrograms">
        <Stack.Screen
          name="BrowseWorkoutPrograms"
          component={BrowseProgramScreen}
          // Add our own Header component later
          options={{ 
            headerShown: true,
            header: () => <CustomHeader title="Workout Programs" userName="User_1" profilePic={defaultPic} />,
           }}
        />
        <Stack.Screen
          name="WorkoutProgram"
          component={WorkoutProgramScreen}
          // Add our own Header component later
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
