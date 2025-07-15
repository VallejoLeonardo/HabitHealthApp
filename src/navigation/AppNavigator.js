/**
 * Main App Navigator with Drawer Navigation
 * Root navigation component that manages all app navigation
 */

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { StatusBar } from "expo-status-bar";

// Navigation components
import CustomDrawerContent from "./CustomDrawerContent";
import BottomTabNavigator from "./BottomTabNavigator";

// Screens
import ProfileScreen from "../screens/profile/ProfileScreen";
import StatsScreen from "../screens/stats/StatsScreen";
import SettingsScreen from "../screens/profile/SettingsScreen";

import theme from "../theme";

const Drawer = createDrawerNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <StatusBar style="dark" backgroundColor={theme.colors.background} />
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.colors.primary,
          },
          headerTintColor: theme.colors.textLight,
          headerTitleStyle: {
            fontWeight: theme.fonts.weight.bold,
            fontSize: theme.fonts.size.lg,
          },
          drawerType: "slide",
          drawerStyle: {
            width: 280,
          },
        }}
      >
        <Drawer.Screen
          name="Home"
          component={BottomTabNavigator}
          options={{
            title: "Hábitos y Salud",
            headerStyle: {
              backgroundColor: theme.colors.primary,
            },
          }}
        />
        <Drawer.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            title: "Perfil",
          }}
        />
        <Drawer.Screen
          name="Stats"
          component={StatsScreen}
          options={{
            title: "Estadísticas",
          }}
        />
        <Drawer.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            title: "Configuración",
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
