// NavigationBar.tsx
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import BrowseProgramScreen from "../../screens/BrowseProgramsScreen/BrowseProgramScreen";
import ProfileScreen from "../../screens/ProfileScreen/ProfileScreen";
import Icon from "react-native-vector-icons/Ionicons";
import tabBarStyles from "./NavigationBar.styled";
import InformationScreen from "../../screens/InformationPage/InformationScreen";
import { LogBox } from "react-native";
import ExerciseInformationScreen from "../../screens/InformationPage/ExerciseInformationScreen";

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#ff8610",
        tabBarInactiveTintColor: "#424242",
        tabBarStyle: tabBarStyles.tabBarStyle,
      }}
    >
      <Tab.Screen
        name="Browse Workouts"
        component={BrowseProgramScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon name="barbell-sharp" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Information"
        component={ExerciseInformationScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon name="information-sharp" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon name="person" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default MyTabs;
