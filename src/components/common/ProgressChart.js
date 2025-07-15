/**
 * ProgressChart Component - Versatile chart component for displaying habit progress
 *
 * @param {array} data - Chart data
 * @param {string} type - Chart type: 'bar' | 'line' | 'circular'
 * @param {string} color - Chart color
 * @param {number} height - Chart height
 * @param {boolean} showLabels - Show data labels
 */

import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import theme from "../../theme";

const { width: screenWidth } = Dimensions.get("window");

const ProgressChart = ({
  data = [],
  type = "bar",
  color = theme.colors.primary,
  height = 200,
  showLabels = true,
  style,
}) => {
  // Calculate chart dimensions
  const chartWidth = screenWidth - theme.spacing.md * 4;
  const chartHeight = height;

  // Find max value for scaling
  const maxValue = Math.max(...data.map((item) => item.value), 1);

  const renderBarChart = () => {
    const barWidth =
      (chartWidth - (data.length - 1) * theme.spacing.sm) / data.length;

    return (
      <View style={styles.chartContainer}>
        <View style={[styles.chart, { height: chartHeight }]}>
          <View style={styles.barsContainer}>
            {data.map((item, index) => {
              const barHeight = (item.value / maxValue) * (chartHeight - 40);

              return (
                <View key={index} style={styles.barWrapper}>
                  <View style={styles.barContainer}>
                    {showLabels && (
                      <Text style={styles.barValue}>{item.value}</Text>
                    )}
                    <View
                      style={[
                        styles.bar,
                        {
                          width: barWidth,
                          height: Math.max(barHeight, 4),
                          backgroundColor: color,
                        },
                      ]}
                    />
                  </View>
                  {showLabels && (
                    <Text style={styles.barLabel}>{item.label}</Text>
                  )}
                </View>
              );
            })}
          </View>
        </View>
      </View>
    );
  };

  const renderLineChart = () => {
    const pointSpacing = chartWidth / (data.length - 1 || 1);

    return (
      <View style={styles.chartContainer}>
        <View style={[styles.chart, { height: chartHeight }]}>
          <View style={styles.lineContainer}>
            {data.map((item, index) => {
              const y =
                chartHeight - 40 - (item.value / maxValue) * (chartHeight - 60);
              const x = index * pointSpacing;

              return (
                <View
                  key={index}
                  style={[
                    styles.linePoint,
                    {
                      left: x - 6,
                      top: y - 6,
                      backgroundColor: color,
                    },
                  ]}
                >
                  {showLabels && (
                    <Text style={styles.pointLabel}>{item.value}</Text>
                  )}
                </View>
              );
            })}
          </View>

          {showLabels && (
            <View style={styles.lineLabels}>
              {data.map((item, index) => (
                <Text key={index} style={styles.lineLabel}>
                  {item.label}
                </Text>
              ))}
            </View>
          )}
        </View>
      </View>
    );
  };

  const renderCircularChart = () => {
    if (data.length === 0) return null;

    const totalValue = data.reduce((sum, item) => sum + item.value, 0);
    const radius = 60;
    const circumference = 2 * Math.PI * radius;

    return (
      <View style={styles.chartContainer}>
        <View style={[styles.circularChart, { height: chartHeight }]}>
          <View style={styles.circularProgress}>
            {data.map((item, index) => {
              const percentage = (item.value / totalValue) * 100;
              const strokeDasharray = `${
                (percentage / 100) * circumference
              } ${circumference}`;

              return (
                <View key={index} style={styles.progressRing}>
                  {/* This would require react-native-svg for proper circular progress */}
                  <View
                    style={[
                      styles.progressSegment,
                      {
                        backgroundColor: color,
                        width: `${percentage}%`,
                      },
                    ]}
                  />
                </View>
              );
            })}

            <View style={styles.circularCenter}>
              <Text style={styles.circularValue}>{totalValue}</Text>
              <Text style={styles.circularLabel}>Total</Text>
            </View>
          </View>

          {showLabels && (
            <View style={styles.circularLabels}>
              {data.map((item, index) => (
                <View key={index} style={styles.circularLabelItem}>
                  <View
                    style={[
                      styles.circularColorIndicator,
                      { backgroundColor: color },
                    ]}
                  />
                  <Text style={styles.circularLabelText}>
                    {item.label}: {item.value}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </View>
    );
  };

  const renderChart = () => {
    switch (type) {
      case "bar":
        return renderBarChart();
      case "line":
        return renderLineChart();
      case "circular":
        return renderCircularChart();
      default:
        return renderBarChart();
    }
  };

  if (!data || data.length === 0) {
    return (
      <View style={[styles.chartContainer, style]}>
        <View style={[styles.chart, { height: chartHeight }]}>
          <View style={styles.noDataContainer}>
            <Text style={styles.noDataText}>No hay datos disponibles</Text>
          </View>
        </View>
      </View>
    );
  }

  return <View style={[styles.container, style]}>{renderChart()}</View>;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.backgroundSecondary,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
  },
  chartContainer: {
    alignItems: "center",
  },
  chart: {
    width: "100%",
    justifyContent: "flex-end",
    position: "relative",
  },

  // Bar Chart Styles
  barsContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    height: "100%",
    paddingBottom: 20,
  },
  barWrapper: {
    alignItems: "center",
    flex: 1,
  },
  barContainer: {
    alignItems: "center",
    justifyContent: "flex-end",
    flex: 1,
  },
  bar: {
    borderRadius: theme.borderRadius.sm,
    minHeight: 4,
  },
  barValue: {
    ...theme.textStyles.caption,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
  },
  barLabel: {
    ...theme.textStyles.caption,
    color: theme.colors.textSecondary,
    textAlign: "center",
    marginTop: theme.spacing.xs,
  },

  // Line Chart Styles
  lineContainer: {
    position: "relative",
    height: "100%",
  },
  linePoint: {
    position: "absolute",
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: theme.colors.background,
  },
  pointLabel: {
    ...theme.textStyles.caption,
    color: theme.colors.textSecondary,
    position: "absolute",
    top: -20,
    left: -10,
    textAlign: "center",
    minWidth: 20,
  },
  lineLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: theme.spacing.sm,
  },
  lineLabel: {
    ...theme.textStyles.caption,
    color: theme.colors.textSecondary,
  },

  // Circular Chart Styles
  circularChart: {
    alignItems: "center",
    justifyContent: "center",
  },
  circularProgress: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: theme.colors.border,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  progressRing: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: 60,
  },
  progressSegment: {
    height: 8,
    borderRadius: 4,
    marginVertical: 2,
  },
  circularCenter: {
    alignItems: "center",
  },
  circularValue: {
    ...theme.textStyles.h3,
    color: theme.colors.textPrimary,
  },
  circularLabel: {
    ...theme.textStyles.caption,
    color: theme.colors.textSecondary,
  },
  circularLabels: {
    marginTop: theme.spacing.md,
  },
  circularLabelItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: theme.spacing.xs,
  },
  circularColorIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: theme.spacing.sm,
  },
  circularLabelText: {
    ...theme.textStyles.bodySmall,
    color: theme.colors.textSecondary,
  },

  // No Data Styles
  noDataContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noDataText: {
    ...theme.textStyles.body,
    color: theme.colors.textSecondary,
    fontStyle: "italic",
  },
});

export default ProgressChart;
