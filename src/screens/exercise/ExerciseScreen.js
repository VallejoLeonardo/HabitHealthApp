/**
 * Exercise Screen - Main screen for exercise habit tracking
 * Shows daily summary, allows adding new exercise records, and displays history
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

// Import components (will be created in Phase 2)
import HabitCard from "../../components/common/HabitCard";
import CustomButton from "../../components/common/CustomButton";

const ExerciseScreen = () => {
  const [todayStats, setTodayStats] = useState({
    duration: 30,
    target: 60,
    calories: 250,
    caloriesTarget: 400,
    exercises: 2,
    exercisesTarget: 3,
  });

  const handleAddExercise = () => {
    // Navigate to add exercise form
    console.log("Add exercise pressed");
  };

  const handleViewHistory = () => {
    // Navigate to exercise history
    console.log("View history pressed");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Ejercicio de Hoy</Text>
          <Text style={styles.headerSubtitle}>
            {new Date().toLocaleDateString("es-ES", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Text>
        </View>

        {/* Summary Cards */}
        <View style={styles.cardsContainer}>
          <HabitCard
            title="Duración"
            value={`${todayStats.duration} min`}
            target={`${todayStats.target} min`}
            progress={(todayStats.duration / todayStats.target) * 100}
            icon="time-outline"
            color={theme.colors.exercise.primary}
            onPress={() => console.log("Duration card pressed")}
          />

          <HabitCard
            title="Calorías"
            value={`${todayStats.calories} cal`}
            target={`${todayStats.caloriesTarget} cal`}
            progress={(todayStats.calories / todayStats.caloriesTarget) * 100}
            icon="flame-outline"
            color={theme.colors.exercise.primary}
            onPress={() => console.log("Calories card pressed")}
          />

          <HabitCard
            title="Ejercicios"
            value={`${todayStats.exercises}`}
            target={`${todayStats.exercisesTarget}`}
            progress={(todayStats.exercises / todayStats.exercisesTarget) * 100}
            icon="barbell-outline"
            color={theme.colors.exercise.primary}
            onPress={() => console.log("Exercises card pressed")}
          />
        </View>

        {/* Quick Actions */}
        <View style={styles.actionsContainer}>
          <Text style={styles.sectionTitle}>Acciones Rápidas</Text>

          <View style={styles.actionButtons}>
            <CustomButton
              title="Registrar Ejercicio"
              onPress={handleAddExercise}
              variant="primary"
              icon="add-circle-outline"
              style={styles.actionButton}
            />

            <CustomButton
              title="Ver Historial"
              onPress={handleViewHistory}
              variant="outline"
              icon="list-outline"
              style={styles.actionButton}
            />
          </View>
        </View>

        {/* Recent Activities */}
        <View style={styles.recentContainer}>
          <Text style={styles.sectionTitle}>Actividades Recientes</Text>

          <View style={styles.activityItem}>
            <View style={styles.activityIcon}>
              <Ionicons
                name="bicycle"
                size={24}
                color={theme.colors.exercise.primary}
              />
            </View>
            <View style={styles.activityInfo}>
              <Text style={styles.activityTitle}>Ciclismo</Text>
              <Text style={styles.activityDetails}>45 min - 320 cal</Text>
              <Text style={styles.activityTime}>Hace 2 horas</Text>
            </View>
          </View>

          <View style={styles.activityItem}>
            <View style={styles.activityIcon}>
              <Ionicons
                name="walk"
                size={24}
                color={theme.colors.exercise.primary}
              />
            </View>
            <View style={styles.activityInfo}>
              <Text style={styles.activityTitle}>Caminata</Text>
              <Text style={styles.activityDetails}>30 min - 150 cal</Text>
              <Text style={styles.activityTime}>Ayer</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab} onPress={handleAddExercise}>
        <Ionicons name="add" size={28} color={theme.colors.textLight} />
      </TouchableOpacity>
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
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.lg,
    backgroundColor: theme.colors.exercise.light,
  },
  headerTitle: {
    ...theme.textStyles.h2,
    color: theme.colors.exercise.dark,
    marginBottom: theme.spacing.xs,
  },
  headerSubtitle: {
    ...theme.textStyles.body,
    color: theme.colors.textSecondary,
  },
  cardsContainer: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.lg,
  },
  actionsContainer: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
  },
  sectionTitle: {
    ...theme.textStyles.h4,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.md,
  },
  actionButtons: {
    gap: theme.spacing.md,
  },
  actionButton: {
    marginBottom: theme.spacing.sm,
  },
  recentContainer: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
  },
  activityItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.md,
    backgroundColor: theme.colors.backgroundSecondary,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.sm,
  },
  activityIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.colors.exercise.light,
    justifyContent: "center",
    alignItems: "center",
    marginRight: theme.spacing.md,
  },
  activityInfo: {
    flex: 1,
  },
  activityTitle: {
    ...theme.textStyles.body,
    fontWeight: theme.fonts.weight.medium,
    color: theme.colors.textPrimary,
  },
  activityDetails: {
    ...theme.textStyles.bodySmall,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs,
  },
  activityTime: {
    ...theme.textStyles.caption,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs,
  },
  fab: {
    position: "absolute",
    bottom: theme.spacing.xl,
    right: theme.spacing.md,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: theme.colors.exercise.primary,
    justifyContent: "center",
    alignItems: "center",
    ...theme.shadows.lg,
  },
});

export default ExerciseScreen;
