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
import { LogBox, View } from "react-native";
import MyTabs from "./components/NavigationBar/NavigationBar";
import AddWorkoutProgramScreen from "./screens/AddWorkoutProgramScreen/AddWorkoutProgramScreen";
import ExerciseInformationScreen from "./screens/InformationPage/ExerciseInformationScreen";
import ProfileScreen from "./screens/ProfileScreen/ProfileScreen";
import EditProfileScreen from "./screens/EditProfileScreen/EditProfileScreen";

LogBox.ignoreLogs(["expo-font"]);

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="LoginScreen"
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: "black" },
        }}
      >
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={({ navigation }) => ({
            headerShown: false,
          })}
        />
        <Stack.Screen
          name="Main"
          component={MyTabs}
          options={({ navigation }) => ({
            headerShown: true,
            header: () => <CustomHeader navigation={navigation} />,
          })}
        />
        <Stack.Screen
          name="WorkoutProgram"
          component={WorkoutProgramScreen}
          options={({ navigation }) => ({
            headerShown: true,
            header: () => (
              <CustomHeader
                navigation={navigation}
                label="Workout Program"
                showBackButton={true}
                showUserInfo={false}
              />
            ),
          })}
        />
        <Stack.Screen
          name="AddWorkoutProgramScreen"
          component={AddWorkoutProgramScreen}
          options={({ navigation }) => ({
            headerShown: true,
            header: () => (
              <CustomHeader
                navigation={navigation}
                showBackButton={true}
                showUserInfo={false}
                label="Add workout program"
              />
            ),
          })}
        />
        <Stack.Screen
          name="EditProfileScreen"
          component={EditProfileScreen}
          options={({ navigation }) => ({
            headerShown: true,
            header: () => (
              <CustomHeader
                navigation={navigation}
                label="Account settings"
                showBackButton={true}
                showUserInfo={false}
              />
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
