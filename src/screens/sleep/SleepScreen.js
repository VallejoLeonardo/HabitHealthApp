/**
 * Sleep Screen - Main screen for sleep habit tracking
 * Shows daily sleep summary, allows adding new sleep records, and displays history
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

const SleepScreen = () => {
  const [todayStats, setTodayStats] = useState({
    duration: 7.5,
    target: 8,
    quality: 8,
    qualityTarget: 8,
    bedtime: "23:30",
    wakeup: "07:00",
  });

  const handleAddSleep = () => {
    console.log("Add sleep record pressed");
  };

  const handleViewHistory = () => {
    console.log("View sleep history pressed");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Sueño de Anoche</Text>
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
            value={`${todayStats.duration} hrs`}
            target={`${todayStats.target} hrs`}
            progress={(todayStats.duration / todayStats.target) * 100}
            icon="moon-outline"
            color={theme.colors.sleep.primary}
            onPress={() => console.log("Duration card pressed")}
          />

          <HabitCard
            title="Calidad"
            value={`${todayStats.quality}/10`}
            target={`${todayStats.qualityTarget}/10`}
            progress={(todayStats.quality / todayStats.qualityTarget) * 100}
            icon="star-outline"
            color={theme.colors.sleep.primary}
            onPress={() => console.log("Quality card pressed")}
          />
        </View>

        {/* Sleep Times */}
        <View style={styles.timesContainer}>
          <Text style={styles.sectionTitle}>Horarios</Text>

          <View style={styles.timeCard}>
            <View style={styles.timeItem}>
              <Ionicons
                name="bed-outline"
                size={24}
                color={theme.colors.sleep.primary}
              />
              <View style={styles.timeInfo}>
                <Text style={styles.timeLabel}>Hora de dormir</Text>
                <Text style={styles.timeValue}>{todayStats.bedtime}</Text>
              </View>
            </View>

            <View style={styles.timeItem}>
              <Ionicons
                name="sunny-outline"
                size={24}
                color={theme.colors.sleep.primary}
              />
              <View style={styles.timeInfo}>
                <Text style={styles.timeLabel}>Hora de despertar</Text>
                <Text style={styles.timeValue}>{todayStats.wakeup}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.actionsContainer}>
          <Text style={styles.sectionTitle}>Acciones Rápidas</Text>

          <View style={styles.actionButtons}>
            <CustomButton
              title="Registrar Sueño"
              onPress={handleAddSleep}
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

        {/* Sleep Tips */}
        <View style={styles.tipsContainer}>
          <Text style={styles.sectionTitle}>Consejos para Dormir Mejor</Text>

          <View style={styles.tipItem}>
            <Ionicons
              name="checkmark-circle"
              size={20}
              color={theme.colors.success}
            />
            <Text style={styles.tipText}>
              Mantén un horario de sueño regular
            </Text>
          </View>

          <View style={styles.tipItem}>
            <Ionicons
              name="checkmark-circle"
              size={20}
              color={theme.colors.success}
            />
            <Text style={styles.tipText}>
              Evita pantallas 1 hora antes de dormir
            </Text>
          </View>

          <View style={styles.tipItem}>
            <Ionicons
              name="checkmark-circle"
              size={20}
              color={theme.colors.success}
            />
            <Text style={styles.tipText}>
              Mantén tu habitación fresca y oscura
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab} onPress={handleAddSleep}>
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
    backgroundColor: theme.colors.sleep.light,
  },
  headerTitle: {
    ...theme.textStyles.h2,
    color: theme.colors.sleep.dark,
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
  timesContainer: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
  },
  sectionTitle: {
    ...theme.textStyles.h4,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.md,
  },
  timeCard: {
    backgroundColor: theme.colors.backgroundSecondary,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
  },
  timeItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: theme.spacing.md,
  },
  timeInfo: {
    marginLeft: theme.spacing.md,
    flex: 1,
  },
  timeLabel: {
    ...theme.textStyles.bodySmall,
    color: theme.colors.textSecondary,
  },
  timeValue: {
    ...theme.textStyles.h4,
    color: theme.colors.textPrimary,
    marginTop: theme.spacing.xs,
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
  tipsContainer: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
  },
  tipItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    backgroundColor: theme.colors.backgroundSecondary,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.sm,
  },
  tipText: {
    ...theme.textStyles.body,
    color: theme.colors.textPrimary,
    marginLeft: theme.spacing.sm,
    flex: 1,
  },
  fab: {
    position: "absolute",
    bottom: theme.spacing.xl,
    right: theme.spacing.md,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: theme.colors.sleep.primary,
    justifyContent: "center",
    alignItems: "center",
    ...theme.shadows.lg,
  },
});

export default SleepScreen;
