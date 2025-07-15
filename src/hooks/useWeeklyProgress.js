/**
 * useWeeklyProgress Hook - Custom hook for weekly progress tracking
 *
 * @param {string} habitType - Type of habit: 'exercise' | 'sleep' | 'nutrition'
 * @returns {object} Weekly progress data and utilities
 */

import { useMemo } from "react";
import { useRecords } from "../context/RecordsContext";
import { useHabits } from "../context/HabitsContext";

const useWeeklyProgress = (habitType) => {
  const { computed: recordsComputed } = useRecords();
  const { computed: habitsComputed } = useHabits();

  const weeklyData = useMemo(() => {
    const records = recordsComputed.getWeeklyData(habitType);
    const habit = habitsComputed.getHabitById(habitType);

    if (!habit) return null;

    // Get the last 7 days
    const today = new Date();
    const weekDays = [];

    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateKey = date.toISOString().split("T")[0];

      weekDays.push({
        date: dateKey,
        dayName: date.toLocaleDateString("es-ES", { weekday: "short" }),
        record: records.find((r) => r.date === dateKey) || null,
      });
    }

    return weekDays;
  }, [habitType, recordsComputed, habitsComputed]);

  const progressPercentage = useMemo(() => {
    if (!weeklyData) return 0;

    const completedDays = weeklyData.filter(
      (day) => day.record !== null
    ).length;
    return Math.round((completedDays / 7) * 100);
  }, [weeklyData]);

  const bestDay = useMemo(() => {
    if (!weeklyData) return null;

    const daysWithRecords = weeklyData.filter((day) => day.record !== null);
    if (daysWithRecords.length === 0) return null;

    // Find best day based on habit type
    let bestDay = daysWithRecords[0];

    switch (habitType) {
      case "exercise":
        bestDay = daysWithRecords.reduce((best, current) => {
          const bestScore =
            (best.record.duration || 0) + (best.record.calories || 0) / 10;
          const currentScore =
            (current.record.duration || 0) +
            (current.record.calories || 0) / 10;
          return currentScore > bestScore ? current : best;
        });
        break;

      case "sleep":
        bestDay = daysWithRecords.reduce((best, current) => {
          const bestScore =
            (best.record.duration || 0) + (best.record.quality || 0);
          const currentScore =
            (current.record.duration || 0) + (current.record.quality || 0);
          return currentScore > bestScore ? current : best;
        });
        break;

      case "nutrition":
        bestDay = daysWithRecords.reduce((best, current) => {
          const bestScore = (best.record.water || 0) + (best.record.meals || 0);
          const currentScore =
            (current.record.water || 0) + (current.record.meals || 0);
          return currentScore > bestScore ? current : best;
        });
        break;
    }

    return bestDay;
  }, [weeklyData, habitType]);

  const worstDay = useMemo(() => {
    if (!weeklyData) return null;

    const daysWithRecords = weeklyData.filter((day) => day.record !== null);
    if (daysWithRecords.length === 0) return null;

    let worstDay = daysWithRecords[0];

    switch (habitType) {
      case "exercise":
        worstDay = daysWithRecords.reduce((worst, current) => {
          const worstScore =
            (worst.record.duration || 0) + (worst.record.calories || 0) / 10;
          const currentScore =
            (current.record.duration || 0) +
            (current.record.calories || 0) / 10;
          return currentScore < worstScore ? current : worst;
        });
        break;

      case "sleep":
        worstDay = daysWithRecords.reduce((worst, current) => {
          const worstScore =
            (worst.record.duration || 0) + (worst.record.quality || 0);
          const currentScore =
            (current.record.duration || 0) + (current.record.quality || 0);
          return currentScore < worstScore ? current : worst;
        });
        break;

      case "nutrition":
        worstDay = daysWithRecords.reduce((worst, current) => {
          const worstScore =
            (worst.record.water || 0) + (worst.record.meals || 0);
          const currentScore =
            (current.record.water || 0) + (current.record.meals || 0);
          return currentScore < worstScore ? current : worst;
        });
        break;
    }

    return worstDay;
  }, [weeklyData, habitType]);

  const trend = useMemo(() => {
    if (!weeklyData || weeklyData.length < 4) return "stable";

    const recentDays = weeklyData.slice(-3); // Last 3 days
    const earlierDays = weeklyData.slice(0, 3); // First 3 days

    const recentScore =
      recentDays.reduce((sum, day) => {
        if (!day.record) return sum;

        switch (habitType) {
          case "exercise":
            return sum + (day.record.duration || 0);
          case "sleep":
            return sum + (day.record.duration || 0);
          case "nutrition":
            return sum + (day.record.water || 0);
          default:
            return sum;
        }
      }, 0) / recentDays.filter((d) => d.record).length;

    const earlierScore =
      earlierDays.reduce((sum, day) => {
        if (!day.record) return sum;

        switch (habitType) {
          case "exercise":
            return sum + (day.record.duration || 0);
          case "sleep":
            return sum + (day.record.duration || 0);
          case "nutrition":
            return sum + (day.record.water || 0);
          default:
            return sum;
        }
      }, 0) / earlierDays.filter((d) => d.record).length;

    const difference = recentScore - earlierScore;
    const threshold = 0.1; // 10% threshold

    if (difference > threshold) return "improving";
    if (difference < -threshold) return "declining";
    return "stable";
  }, [weeklyData, habitType]);

  const refreshData = () => {
    // This would trigger a refresh of the data
    // In a real app, this might refetch from an API or reload from storage
    console.log(`Refreshing weekly data for ${habitType}`);
  };

  const getChartData = () => {
    if (!weeklyData) return [];

    return weeklyData.map((day) => {
      let value = 0;

      if (day.record) {
        switch (habitType) {
          case "exercise":
            value = day.record.duration || 0;
            break;
          case "sleep":
            value = day.record.duration || 0;
            break;
          case "nutrition":
            value = day.record.water || 0;
            break;
        }
      }

      return {
        label: day.dayName,
        value: value,
        date: day.date,
      };
    });
  };

  return {
    weeklyData,
    progressPercentage,
    bestDay,
    worstDay,
    trend,
    refreshData,
    chartData: getChartData(),
  };
};

export default useWeeklyProgress;
