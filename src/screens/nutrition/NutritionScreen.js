/**
 * Nutrition Screen - Main screen for nutrition habit tracking
 * Shows daily nutrition summary, allows adding new nutrition records, and displays history
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

// Import components
import HabitCard from "../../components/common/HabitCard";
import CustomButton from "../../components/common/CustomButton";

const NutritionScreen = () => {
  const [todayStats, setTodayStats] = useState({
    calories: 1850,
    caloriesTarget: 2000,
    water: 6,
    waterTarget: 8,
    meals: 3,
    mealsTarget: 5,
    protein: 120,
    proteinTarget: 150,
  });

  const handleAddMeal = () => {
    console.log("Add meal pressed");
  };

  const handleAddWater = () => {
    // Quick action to add a glass of water
    setTodayStats((prev) => ({
      ...prev,
      water: Math.min(prev.water + 1, prev.waterTarget),
    }));
  };

  const handleViewHistory = () => {
    console.log("View nutrition history pressed");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Nutrición de Hoy</Text>
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
            title="Calorías"
            value={`${todayStats.calories} cal`}
            target={`${todayStats.caloriesTarget} cal`}
            progress={(todayStats.calories / todayStats.caloriesTarget) * 100}
            icon="flame-outline"
            color={theme.colors.nutrition.primary}
            onPress={() => console.log("Calories card pressed")}
          />

          <HabitCard
            title="Agua"
            value={`${todayStats.water} vasos`}
            target={`${todayStats.waterTarget} vasos`}
            progress={(todayStats.water / todayStats.waterTarget) * 100}
            icon="water-outline"
            color={theme.colors.nutrition.primary}
            onPress={() => console.log("Water card pressed")}
          />

          <HabitCard
            title="Comidas"
            value={`${todayStats.meals}`}
            target={`${todayStats.mealsTarget}`}
            progress={(todayStats.meals / todayStats.mealsTarget) * 100}
            icon="restaurant-outline"
            color={theme.colors.nutrition.primary}
            onPress={() => console.log("Meals card pressed")}
          />
        </View>

        {/* Water Intake Quick Action */}
        <View style={styles.waterContainer}>
          <Text style={styles.sectionTitle}>Hidratación Rápida</Text>

          <View style={styles.waterTracker}>
            <View style={styles.waterGlasses}>
              {[...Array(todayStats.waterTarget)].map((_, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.waterGlass,
                    index < todayStats.water && styles.waterGlassFilled,
                  ]}
                  onPress={handleAddWater}
                >
                  <Ionicons
                    name="water"
                    size={20}
                    color={
                      index < todayStats.water
                        ? theme.colors.nutrition.primary
                        : theme.colors.textSecondary
                    }
                  />
                </TouchableOpacity>
              ))}
            </View>

            <CustomButton
              title="+ Agregar Vaso"
              onPress={handleAddWater}
              variant="outline"
              icon="add-outline"
              style={styles.waterButton}
            />
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.actionsContainer}>
          <Text style={styles.sectionTitle}>Acciones Rápidas</Text>

          <View style={styles.actionButtons}>
            <CustomButton
              title="Registrar Comida"
              onPress={handleAddMeal}
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

        {/* Recent Meals */}
        <View style={styles.mealsContainer}>
          <Text style={styles.sectionTitle}>Comidas Recientes</Text>

          <View style={styles.mealItem}>
            <View style={styles.mealIcon}>
              <Ionicons
                name="sunny"
                size={24}
                color={theme.colors.nutrition.primary}
              />
            </View>
            <View style={styles.mealInfo}>
              <Text style={styles.mealTitle}>Desayuno</Text>
              <Text style={styles.mealDetails}>Avena con frutas - 350 cal</Text>
              <Text style={styles.mealTime}>08:30</Text>
            </View>
          </View>

          <View style={styles.mealItem}>
            <View style={styles.mealIcon}>
              <Ionicons
                name="partly-sunny"
                size={24}
                color={theme.colors.nutrition.primary}
              />
            </View>
            <View style={styles.mealInfo}>
              <Text style={styles.mealTitle}>Almuerzo</Text>
              <Text style={styles.mealDetails}>
                Ensalada de pollo - 450 cal
              </Text>
              <Text style={styles.mealTime}>13:15</Text>
            </View>
          </View>

          <View style={styles.mealItem}>
            <View style={styles.mealIcon}>
              <Ionicons
                name="moon"
                size={24}
                color={theme.colors.nutrition.primary}
              />
            </View>
            <View style={styles.mealInfo}>
              <Text style={styles.mealTitle}>Cena</Text>
              <Text style={styles.mealDetails}>
                Salmón con verduras - 520 cal
              </Text>
              <Text style={styles.mealTime}>19:45</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab} onPress={handleAddMeal}>
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
    backgroundColor: theme.colors.nutrition.light,
  },
  headerTitle: {
    ...theme.textStyles.h2,
    color: theme.colors.nutrition.dark,
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
  waterContainer: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
  },
  sectionTitle: {
    ...theme.textStyles.h4,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.md,
  },
  waterTracker: {
    backgroundColor: theme.colors.backgroundSecondary,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
  },
  waterGlasses: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: theme.spacing.md,
  },
  waterGlass: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.background,
    justifyContent: "center",
    alignItems: "center",
    margin: theme.spacing.xs,
    borderWidth: 2,
    borderColor: theme.colors.border,
  },
  waterGlassFilled: {
    backgroundColor: theme.colors.nutrition.light,
    borderColor: theme.colors.nutrition.primary,
  },
  waterButton: {
    alignSelf: "center",
  },
  actionsContainer: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
  },
  actionButtons: {
    gap: theme.spacing.md,
  },
  actionButton: {
    marginBottom: theme.spacing.sm,
  },
  mealsContainer: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
  },
  mealItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.md,
    backgroundColor: theme.colors.backgroundSecondary,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.sm,
  },
  mealIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.colors.nutrition.light,
    justifyContent: "center",
    alignItems: "center",
    marginRight: theme.spacing.md,
  },
  mealInfo: {
    flex: 1,
  },
  mealTitle: {
    ...theme.textStyles.body,
    fontWeight: theme.fonts.weight.medium,
    color: theme.colors.textPrimary,
  },
  mealDetails: {
    ...theme.textStyles.bodySmall,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs,
  },
  mealTime: {
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
    backgroundColor: theme.colors.nutrition.primary,
    justifyContent: "center",
    alignItems: "center",
    ...theme.shadows.lg,
  },
});

export default NutritionScreen;
