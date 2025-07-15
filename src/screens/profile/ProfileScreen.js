/**
 * Profile Screen - User profile information and settings
 */

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import theme from "../../theme";

const ProfileScreen = () => {
  const [userInfo, setUserInfo] = useState({
    name: "Usuario Demo",
    email: "demo@habithealth.com",
    age: 30,
    weight: 70,
    height: 175,
    goal: "Mantener un estilo de vida saludable",
  });

  const profileStats = [
    {
      title: "Días Activos",
      value: "45",
      icon: "calendar-outline",
      color: theme.colors.primary,
    },
    {
      title: "Hábitos Completados",
      value: "89%",
      icon: "checkmark-circle-outline",
      color: theme.colors.success,
    },
    {
      title: "Racha Actual",
      value: "12 días",
      icon: "flame-outline",
      color: theme.colors.warning,
    },
  ];

  const menuItems = [
    {
      title: "Editar Perfil",
      icon: "person-outline",
      onPress: () => console.log("Edit profile"),
    },
    {
      title: "Objetivos",
      icon: "target-outline",
      onPress: () => console.log("Goals"),
    },
    {
      title: "Notificaciones",
      icon: "notifications-outline",
      onPress: () => console.log("Notifications"),
    },
    {
      title: "Privacidad",
      icon: "shield-outline",
      onPress: () => console.log("Privacy"),
    },
    {
      title: "Ayuda",
      icon: "help-circle-outline",
      onPress: () => console.log("Help"),
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header */}
        <View style={styles.headerContainer}>
          <View style={styles.avatarContainer}>
            <Ionicons name="person" size={60} color={theme.colors.textLight} />
          </View>
          <Text style={styles.userName}>{userInfo.name}</Text>
          <Text style={styles.userEmail}>{userInfo.email}</Text>
          <Text style={styles.userGoal}>{userInfo.goal}</Text>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          {profileStats.map((stat, index) => (
            <View key={index} style={styles.statCard}>
              <View
                style={[
                  styles.statIcon,
                  { backgroundColor: stat.color + "20" },
                ]}
              >
                <Ionicons name={stat.icon} size={24} color={stat.color} />
              </View>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statTitle}>{stat.title}</Text>
            </View>
          ))}
        </View>

        {/* User Info */}
        <View style={styles.infoContainer}>
          <Text style={styles.sectionTitle}>Información Personal</Text>

          <View style={styles.infoCard}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Edad</Text>
              <Text style={styles.infoValue}>{userInfo.age} años</Text>
            </View>

            <View style={styles.infoDivider} />

            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Peso</Text>
              <Text style={styles.infoValue}>{userInfo.weight} kg</Text>
            </View>

            <View style={styles.infoDivider} />

            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Altura</Text>
              <Text style={styles.infoValue}>{userInfo.height} cm</Text>
            </View>
          </View>
        </View>

        {/* Menu Options */}
        <View style={styles.menuContainer}>
          <Text style={styles.sectionTitle}>Configuración</Text>

          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={item.onPress}
            >
              <View style={styles.menuLeft}>
                <Ionicons
                  name={item.icon}
                  size={24}
                  color={theme.colors.textSecondary}
                />
                <Text style={styles.menuText}>{item.title}</Text>
              </View>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={theme.colors.textSecondary}
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
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
  headerContainer: {
    alignItems: "center",
    paddingVertical: theme.spacing.xl,
    paddingHorizontal: theme.spacing.md,
    backgroundColor: theme.colors.primary,
  },
  avatarContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: theme.colors.primaryDark,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: theme.spacing.md,
  },
  userName: {
    ...theme.textStyles.h2,
    color: theme.colors.textLight,
    marginBottom: theme.spacing.xs,
  },
  userEmail: {
    ...theme.textStyles.body,
    color: theme.colors.primaryLight,
    marginBottom: theme.spacing.sm,
  },
  userGoal: {
    ...theme.textStyles.bodySmall,
    color: theme.colors.primaryLight,
    textAlign: "center",
    fontStyle: "italic",
  },
  statsContainer: {
    flexDirection: "row",
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.lg,
    justifyContent: "space-between",
  },
  statCard: {
    flex: 1,
    alignItems: "center",
    backgroundColor: theme.colors.backgroundSecondary,
    borderRadius: theme.borderRadius.md,
    paddingVertical: theme.spacing.md,
    marginHorizontal: theme.spacing.xs,
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: theme.spacing.sm,
  },
  statValue: {
    ...theme.textStyles.h3,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs,
  },
  statTitle: {
    ...theme.textStyles.caption,
    color: theme.colors.textSecondary,
    textAlign: "center",
  },
  sectionTitle: {
    ...theme.textStyles.h4,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.md,
  },
  infoContainer: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
  },
  infoCard: {
    backgroundColor: theme.colors.backgroundSecondary,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.md,
  },
  infoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: theme.spacing.md,
  },
  infoDivider: {
    height: 1,
    backgroundColor: theme.colors.border,
  },
  infoLabel: {
    ...theme.textStyles.body,
    color: theme.colors.textSecondary,
  },
  infoValue: {
    ...theme.textStyles.body,
    color: theme.colors.textPrimary,
    fontWeight: theme.fonts.weight.medium,
  },
  menuContainer: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.md,
    backgroundColor: theme.colors.backgroundSecondary,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.sm,
  },
  menuLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuText: {
    ...theme.textStyles.body,
    color: theme.colors.textPrimary,
    marginLeft: theme.spacing.md,
  },
});

export default ProfileScreen;
