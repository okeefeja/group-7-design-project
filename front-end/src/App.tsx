{
  /* Release 1 */
}

import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import BrowseProgramScreen from "./screens/BrowseProgramsScreen/BrowseProgramScreen";
import WorkoutProgramScreen from "./screens/WorkoutProgramScreen/WorkoutProgramScreen";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import CustomHeader from "./components/HeaderBar/HeaderBar";
import HeaderLogo from "../assets/HeaderLogo.png";
import { LogBox } from "react-native";
import AddWorkoutProgramScreen from "./screens/AddWorkoutProgramScreen/AddWorkoutProgramScreen";

LogBox.ignoreLogs(["Warning: ..."]);
LogBox.ignoreAllLogs(true);

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      {/* <Stack.Navigator initialRouteName="BrowseWorkoutPrograms"> */}
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen
          name="BrowseWorkoutPrograms"
          component={BrowseProgramScreen}
          // Add our own Header component later
          options={({ navigation }) => ({
            headerShown: true,
            header: () => (
              <CustomHeader username="User Usersson" navigation={navigation} />
            ),
          })}
        />
        <Stack.Screen
          name="WorkoutProgram"
          component={WorkoutProgramScreen}
          // Add our own Header component later
        />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen
          name="AddWorkoutProgramScreen"
          component={AddWorkoutProgramScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
