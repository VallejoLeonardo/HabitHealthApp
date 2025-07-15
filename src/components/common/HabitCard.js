/**
 * HabitCard Component - Reusable card for displaying habit progress
 *
 * @param {string} title - Card title
 * @param {string} value - Current value
 * @param {string} target - Target value
 * @param {number} progress - Progress percentage (0-100)
 * @param {string} icon - Ionicons icon name
 * @param {string} color - Theme color
 * @param {function} onPress - Press handler
 */

import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import theme from "../../theme";

const HabitCard = ({
  title,
  value,
  target,
  progress = 0,
  icon,
  color = theme.colors.primary,
  onPress,
  style,
}) => {
  // Ensure progress is within bounds
  const normalizedProgress = Math.max(0, Math.min(100, progress));

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <View style={[styles.iconContainer, { backgroundColor: color + "20" }]}>
          <Ionicons name={icon} size={24} color={color} />
        </View>
        <Text style={styles.title}>{title}</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.value}>{value}</Text>
        <Text style={styles.target}>de {target}</Text>
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${normalizedProgress}%`,
                backgroundColor: color,
              },
            ]}
          />
        </View>
        <Text style={styles.progressText}>
          {Math.round(normalizedProgress)}%
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.backgroundSecondary,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    ...theme.shadows.sm,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: theme.spacing.md,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: theme.spacing.sm,
  },
  title: {
    ...theme.textStyles.body,
    fontWeight: theme.fonts.weight.medium,
    color: theme.colors.textPrimary,
  },
  content: {
    marginBottom: theme.spacing.md,
  },
  value: {
    ...theme.textStyles.h3,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs,
  },
  target: {
    ...theme.textStyles.bodySmall,
    color: theme.colors.textSecondary,
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: theme.colors.border,
    borderRadius: 4,
    marginRight: theme.spacing.sm,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 4,
  },
  progressText: {
    ...theme.textStyles.bodySmall,
    color: theme.colors.textSecondary,
    fontWeight: theme.fonts.weight.medium,
    minWidth: 35,
    textAlign: "right",
  },
});

export default HabitCard;
