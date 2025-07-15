import React from "react";
import { StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";

// Context providers
import { AppProvider } from "./src/context/AppContext";

// Navigation
import AppNavigator from "./src/navigation/AppNavigator";

// Theme
import theme from "./src/theme";

export default function App() {
  return (
    <AppProvider>
      <View style={styles.container}>
        <StatusBar style="light" backgroundColor={theme.colors.primary} />
        <AppNavigator />
      </View>
    </AppProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
});
