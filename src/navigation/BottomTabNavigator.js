/**
 * Bottom Tab Navigator for Home section
 * Contains three main habit tracking sections: Exercise, Sleep, Nutrition
 */

import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import theme from "../theme";

// Import screens
import ExerciseScreen from "../screens/exercise/ExerciseScreen";
import SleepScreen from "../screens/sleep/SleepScreen";
import NutritionScreen from "../screens/nutrition/NutritionScreen";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Exercise") {
            iconName = focused ? "fitness" : "fitness-outline";
          } else if (route.name === "Sleep") {
            iconName = focused ? "moon" : "moon-outline";
          } else if (route.name === "Nutrition") {
            iconName = focused ? "restaurant" : "restaurant-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
        tabBarStyle: {
          backgroundColor: theme.colors.background,
          borderTopColor: theme.colors.border,
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: theme.fonts.size.xs,
          fontWeight: theme.fonts.weight.medium,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="Exercise"
        component={ExerciseScreen}
        options={{
          tabBarLabel: "Ejercicio",
        }}
      />
      <Tab.Screen
        name="Sleep"
        component={SleepScreen}
        options={{
          tabBarLabel: "Sueño",
        }}
      />
      <Tab.Screen
        name="Nutrition"
        component={NutritionScreen}
        options={{
          tabBarLabel: "Nutrición",
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
