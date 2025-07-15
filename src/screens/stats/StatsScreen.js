/**
 * Stats Screen - Statistics and analytics for habit tracking
 */

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import theme from "../../theme";

const StatsScreen = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("week");

  const periods = [
    { key: "week", label: "Semana" },
    { key: "month", label: "Mes" },
    { key: "year", label: "Año" },
  ];

  const habitStats = [
    {
      habit: "Ejercicio",
      icon: "fitness",
      color: theme.colors.exercise.primary,
      completion: 85,
      streak: 12,
      total: 45,
    },
    {
      habit: "Sueño",
      icon: "moon",
      color: theme.colors.sleep.primary,
      completion: 78,
      streak: 8,
      total: 42,
    },
    {
      habit: "Nutrición",
      icon: "restaurant",
      color: theme.colors.nutrition.primary,
      completion: 92,
      streak: 15,
      total: 48,
    },
  ];

  const achievements = [
    {
      title: "Primera Semana",
      description: "Completaste tu primera semana de seguimiento",
      icon: "trophy",
      color: theme.colors.warning,
      unlocked: true,
    },
    {
      title: "Racha de 10",
      description: "Mantuviste un hábito por 10 días consecutivos",
      icon: "flame",
      color: theme.colors.error,
      unlocked: true,
    },
    {
      title: "Perfeccionista",
      description: "Completaste todos los hábitos en un día",
      icon: "star",
      color: theme.colors.success,
      unlocked: false,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Period Selector */}
        <View style={styles.periodContainer}>
          <Text style={styles.sectionTitle}>Período</Text>
          <View style={styles.periodSelector}>
            {periods.map((period) => (
              <TouchableOpacity
                key={period.key}
                style={[
                  styles.periodButton,
                  selectedPeriod === period.key && styles.periodButtonActive,
                ]}
                onPress={() => setSelectedPeriod(period.key)}
              >
                <Text
                  style={[
                    styles.periodText,
                    selectedPeriod === period.key && styles.periodTextActive,
                  ]}
                >
                  {period.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Overview Stats */}
        <View style={styles.overviewContainer}>
          <Text style={styles.sectionTitle}>Resumen General</Text>

          <View style={styles.overviewCard}>
            <View style={styles.overviewItem}>
              <Text style={styles.overviewValue}>87%</Text>
              <Text style={styles.overviewLabel}>Completado</Text>
            </View>

            <View style={styles.overviewDivider} />

            <View style={styles.overviewItem}>
              <Text style={styles.overviewValue}>45</Text>
              <Text style={styles.overviewLabel}>Días Activos</Text>
            </View>

            <View style={styles.overviewDivider} />

            <View style={styles.overviewItem}>
              <Text style={styles.overviewValue}>12</Text>
              <Text style={styles.overviewLabel}>Mejor Racha</Text>
            </View>
          </View>
        </View>

        {/* Habit Statistics */}
        <View style={styles.habitsContainer}>
          <Text style={styles.sectionTitle}>Estadísticas por Hábito</Text>

          {habitStats.map((habit, index) => (
            <View key={index} style={styles.habitCard}>
              <View style={styles.habitHeader}>
                <View style={styles.habitTitleContainer}>
                  <View
                    style={[
                      styles.habitIcon,
                      { backgroundColor: habit.color + "20" },
                    ]}
                  >
                    <Ionicons name={habit.icon} size={24} color={habit.color} />
                  </View>
                  <Text style={styles.habitTitle}>{habit.habit}</Text>
                </View>
                <Text style={styles.habitCompletion}>{habit.completion}%</Text>
              </View>

              <View style={styles.habitProgress}>
                <View style={styles.progressBar}>
                  <View
                    style={[
                      styles.progressFill,
                      {
                        width: `${habit.completion}%`,
                        backgroundColor: habit.color,
                      },
                    ]}
                  />
                </View>
              </View>

              <View style={styles.habitDetails}>
                <View style={styles.habitDetailItem}>
                  <Text style={styles.habitDetailLabel}>Racha</Text>
                  <Text style={styles.habitDetailValue}>
                    {habit.streak} días
                  </Text>
                </View>
                <View style={styles.habitDetailItem}>
                  <Text style={styles.habitDetailLabel}>Total</Text>
                  <Text style={styles.habitDetailValue}>
                    {habit.total} días
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Achievements */}
        <View style={styles.achievementsContainer}>
          <Text style={styles.sectionTitle}>Logros</Text>

          {achievements.map((achievement, index) => (
            <View
              key={index}
              style={[
                styles.achievementCard,
                !achievement.unlocked && styles.achievementCardLocked,
              ]}
            >
              <View
                style={[
                  styles.achievementIcon,
                  { backgroundColor: achievement.color + "20" },
                ]}
              >
                <Ionicons
                  name={achievement.icon}
                  size={28}
                  color={
                    achievement.unlocked
                      ? achievement.color
                      : theme.colors.textDisabled
                  }
                />
              </View>

              <View style={styles.achievementInfo}>
                <Text
                  style={[
                    styles.achievementTitle,
                    !achievement.unlocked && styles.achievementTitleLocked,
                  ]}
                >
                  {achievement.title}
                </Text>
                <Text
                  style={[
                    styles.achievementDescription,
                    !achievement.unlocked &&
                      styles.achievementDescriptionLocked,
                  ]}
                >
                  {achievement.description}
                </Text>
              </View>

              {achievement.unlocked && (
                <Ionicons
                  name="checkmark-circle"
                  size={24}
                  color={theme.colors.success}
                />
              )}
            </View>
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
  sectionTitle: {
    ...theme.textStyles.h4,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.md,
  },
  periodContainer: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.lg,
  },
  periodSelector: {
    flexDirection: "row",
    backgroundColor: theme.colors.backgroundSecondary,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.xs,
  },
  periodButton: {
    flex: 1,
    paddingVertical: theme.spacing.sm,
    alignItems: "center",
    borderRadius: theme.borderRadius.sm,
  },
  periodButtonActive: {
    backgroundColor: theme.colors.primary,
  },
  periodText: {
    ...theme.textStyles.body,
    color: theme.colors.textSecondary,
  },
  periodTextActive: {
    color: theme.colors.textLight,
    fontWeight: theme.fonts.weight.medium,
  },
  overviewContainer: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
  },
  overviewCard: {
    flexDirection: "row",
    backgroundColor: theme.colors.backgroundSecondary,
    borderRadius: theme.borderRadius.md,
    paddingVertical: theme.spacing.lg,
  },
  overviewItem: {
    flex: 1,
    alignItems: "center",
  },
  overviewValue: {
    ...theme.textStyles.h2,
    color: theme.colors.primary,
    marginBottom: theme.spacing.xs,
  },
  overviewLabel: {
    ...theme.textStyles.bodySmall,
    color: theme.colors.textSecondary,
  },
  overviewDivider: {
    width: 1,
    backgroundColor: theme.colors.border,
    marginHorizontal: theme.spacing.md,
  },
  habitsContainer: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
  },
  habitCard: {
    backgroundColor: theme.colors.backgroundSecondary,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  habitHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing.md,
  },
  habitTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  habitIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: theme.spacing.sm,
  },
  habitTitle: {
    ...theme.textStyles.body,
    fontWeight: theme.fonts.weight.medium,
    color: theme.colors.textPrimary,
  },
  habitCompletion: {
    ...theme.textStyles.h4,
    color: theme.colors.primary,
  },
  habitProgress: {
    marginBottom: theme.spacing.md,
  },
  progressBar: {
    height: 8,
    backgroundColor: theme.colors.border,
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 4,
  },
  habitDetails: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  habitDetailItem: {
    alignItems: "center",
  },
  habitDetailLabel: {
    ...theme.textStyles.caption,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
  },
  habitDetailValue: {
    ...theme.textStyles.body,
    fontWeight: theme.fonts.weight.medium,
    color: theme.colors.textPrimary,
  },
  achievementsContainer: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
  },
  achievementCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.backgroundSecondary,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm,
  },
  achievementCardLocked: {
    opacity: 0.6,
  },
  achievementIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    marginRight: theme.spacing.md,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    ...theme.textStyles.body,
    fontWeight: theme.fonts.weight.medium,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs,
  },
  achievementTitleLocked: {
    color: theme.colors.textSecondary,
  },
  achievementDescription: {
    ...theme.textStyles.bodySmall,
    color: theme.colors.textSecondary,
  },
  achievementDescriptionLocked: {
    color: theme.colors.textDisabled,
  },
});

export default StatsScreen;
