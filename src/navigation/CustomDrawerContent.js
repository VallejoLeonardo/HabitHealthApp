

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from "react-native";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import theme from "../theme";

const CustomDrawerContent = (props) => {
  const { navigation, state } = props;

  const menuItems = [
    {
      name: "Home",
      icon: "home-outline",
      route: "Home",
    },
    {
      name: "Perfil",
      icon: "person-outline",
      route: "Profile",
    },
    {
      name: "Estadísticas",
      icon: "stats-chart-outline",
      route: "Stats",
    },
    {
      name: "Configuración",
      icon: "settings-outline",
      route: "Settings",
    },
  ];

  const isActiveRoute = (routeName) => {
    return state.routeNames[state.index] === routeName;
  };

  return (
    <SafeAreaView style={styles.container}>
      <DrawerContentScrollView {...props} style={styles.scrollView}>
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.profileSection}>
            <View style={styles.avatarContainer}>
              <Ionicons
                name="person"
                size={40}
                color={theme.colors.textLight}
              />
            </View>
            <Text style={styles.userName}>Usuario Demo</Text>
            <Text style={styles.userEmail}>demo@habithealth.com</Text>
          </View>
        </View>

        {/* Navigation Items */}
        <View style={styles.navigationSection}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.menuItem,
                isActiveRoute(item.route) && styles.activeMenuItem,
              ]}
              onPress={() => navigation.navigate(item.route)}
            >
              <Ionicons
                name={item.icon}
                size={24}
                color={
                  isActiveRoute(item.route)
                    ? theme.colors.primary
                    : theme.colors.textSecondary
                }
              />
              <Text
                style={[
                  styles.menuText,
                  isActiveRoute(item.route) && styles.activeMenuText,
                ]}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </DrawerContentScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.logoutButton}>
          <Ionicons
            name="log-out-outline"
            size={20}
            color={theme.colors.error}
          />
          <Text style={styles.logoutText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.xl,
    paddingHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  profileSection: {
    alignItems: "center",
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: theme.colors.primaryDark,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: theme.spacing.md,
  },
  userName: {
    ...theme.textStyles.h4,
    color: theme.colors.textLight,
    marginBottom: theme.spacing.xs,
  },
  userEmail: {
    ...theme.textStyles.bodySmall,
    color: theme.colors.primaryLight,
  },
  navigationSection: {
    paddingHorizontal: theme.spacing.md,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.xs,
  },
  activeMenuItem: {
    backgroundColor: theme.colors.primaryLight,
  },
  menuText: {
    ...theme.textStyles.body,
    color: theme.colors.textPrimary,
    marginLeft: theme.spacing.md,
  },
  activeMenuText: {
    color: theme.colors.primary,
    fontWeight: theme.fonts.weight.medium,
  },
  footer: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.md,
  },
  logoutText: {
    ...theme.textStyles.body,
    color: theme.colors.error,
    marginLeft: theme.spacing.md,
  },
});

export default CustomDrawerContent;
