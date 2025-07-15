/**
 * useHabitTracker Hook - Custom hook for habit tracking functionality
 *
 * @param {string} habitType - Type of habit: 'exercise' | 'sleep' | 'nutrition'
 * @returns {object} Habit tracking data and functions
 */

import { useState, useCallback, useMemo } from "react";
import { useRecords } from "../context/RecordsContext";
import { useHabits } from "../context/HabitsContext";

const useHabitTracker = (habitType) => {
  const {
    state: recordsState,
    actions: recordsActions,
    computed: recordsComputed,
  } = useRecords();
  const { computed: habitsComputed } = useHabits();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Get today's record for this habit
  const todayRecord = useMemo(() => {
    return recordsComputed.getTodayRecord(habitType);
  }, [recordsComputed, habitType, recordsState.records]);

  // Get habit configuration
  const habitConfig = useMemo(() => {
    return habitsComputed.getHabitById(habitType);
  }, [habitsComputed, habitType]);

  // Add a new record
  const addRecord = useCallback(
    async (data) => {
      try {
        setIsLoading(true);
        setError(null);

        // Validate data based on habit type
        const validatedData = validateHabitData(habitType, data);

        // Simulate async operation (in real app, this might sync with server)
        await new Promise((resolve) => setTimeout(resolve, 500));

        recordsActions.addRecord(habitType, validatedData);

        return { success: true, data: validatedData };
      } catch (err) {
        setError(err.message);
        return { success: false, error: err.message };
      } finally {
        setIsLoading(false);
      }
    },
    [habitType, recordsActions]
  );

  // Update existing record
  const updateRecord = useCallback(
    async (data, date = null) => {
      try {
        setIsLoading(true);
        setError(null);

        const validatedData = validateHabitData(habitType, data);

        await new Promise((resolve) => setTimeout(resolve, 300));

        recordsActions.updateRecord(habitType, validatedData, date);

        return { success: true, data: validatedData };
      } catch (err) {
        setError(err.message);
        return { success: false, error: err.message };
      } finally {
        setIsLoading(false);
      }
    },
    [habitType, recordsActions]
  );

  // Delete a record
  const deleteRecord = useCallback(
    async (date = null) => {
      try {
        setIsLoading(true);
        setError(null);

        await new Promise((resolve) => setTimeout(resolve, 200));

        recordsActions.deleteRecord(habitType, date);

        return { success: true };
      } catch (err) {
        setError(err.message);
        return { success: false, error: err.message };
      } finally {
        setIsLoading(false);
      }
    },
    [habitType, recordsActions]
  );

  // Calculate progress towards goals
  const getProgress = useCallback(() => {
    if (!todayRecord || !habitConfig) {
      return {
        overall: 0,
        details: {},
      };
    }

    const goals = habitConfig.targets.daily;
    const progress = {};
    let totalProgress = 0;
    let goalCount = 0;

    switch (habitType) {
      case "exercise":
        if (goals.duration) {
          progress.duration = Math.min(
            ((todayRecord.duration || 0) / goals.duration) * 100,
            100
          );
          totalProgress += progress.duration;
          goalCount++;
        }
        if (goals.calories) {
          progress.calories = Math.min(
            ((todayRecord.calories || 0) / goals.calories) * 100,
            100
          );
          totalProgress += progress.calories;
          goalCount++;
        }
        if (goals.exercises) {
          progress.exercises = Math.min(
            ((todayRecord.exercises || 0) / goals.exercises) * 100,
            100
          );
          totalProgress += progress.exercises;
          goalCount++;
        }
        break;

      case "sleep":
        if (goals.duration) {
          progress.duration = Math.min(
            ((todayRecord.duration || 0) / goals.duration) * 100,
            100
          );
          totalProgress += progress.duration;
          goalCount++;
        }
        if (goals.quality) {
          progress.quality = Math.min(
            ((todayRecord.quality || 0) / goals.quality) * 100,
            100
          );
          totalProgress += progress.quality;
          goalCount++;
        }
        break;

      case "nutrition":
        if (goals.calories) {
          progress.calories = Math.min(
            ((todayRecord.calories || 0) / goals.calories) * 100,
            100
          );
          totalProgress += progress.calories;
          goalCount++;
        }
        if (goals.water) {
          progress.water = Math.min(
            ((todayRecord.water || 0) / goals.water) * 100,
            100
          );
          totalProgress += progress.water;
          goalCount++;
        }
        if (goals.meals) {
          progress.meals = Math.min(
            ((todayRecord.meals || 0) / goals.meals) * 100,
            100
          );
          totalProgress += progress.meals;
          goalCount++;
        }
        break;
    }

    return {
      overall: goalCount > 0 ? Math.round(totalProgress / goalCount) : 0,
      details: progress,
    };
  }, [todayRecord, habitConfig, habitType]);

  // Get recent records for this habit
  const getRecentRecords = useCallback(
    (days = 7) => {
      return recordsComputed.getRecordsInRange(
        habitType,
        new Date(Date.now() - days * 24 * 60 * 60 * 1000),
        new Date()
      );
    },
    [recordsComputed, habitType]
  );

  // Quick actions for common operations
  const quickActions = useMemo(() => {
    const actions = {};

    switch (habitType) {
      case "exercise":
        actions.addQuickWorkout = (type, duration) => {
          return addRecord({
            type,
            duration,
            calories: duration * 8, // Rough estimate
            exercises: 1,
            intensity: 2,
          });
        };
        break;

      case "sleep":
        actions.recordLastNight = (bedtime, wakeupTime, quality) => {
          const bed = new Date(`2000-01-01T${bedtime}:00`);
          const wake = new Date(`2000-01-02T${wakeupTime}:00`);
          const duration = (wake - bed) / (1000 * 60 * 60); // hours

          return addRecord({
            bedtime,
            wakeupTime,
            duration,
            quality,
          });
        };
        break;

      case "nutrition":
        actions.addWaterGlass = () => {
          const currentWater = todayRecord?.water || 0;
          return updateRecord({
            ...todayRecord,
            water: currentWater + 1,
          });
        };

        actions.addMeal = (calories, protein) => {
          const currentMeals = todayRecord?.meals || 0;
          const currentCalories = todayRecord?.calories || 0;
          const currentProtein = todayRecord?.protein || 0;

          return updateRecord({
            ...todayRecord,
            meals: currentMeals + 1,
            calories: currentCalories + calories,
            protein: currentProtein + (protein || 0),
          });
        };
        break;
    }

    return actions;
  }, [habitType, addRecord, updateRecord, todayRecord]);

  return {
    todayRecord,
    habitConfig,
    addRecord,
    updateRecord,
    deleteRecord,
    isLoading,
    error,
    getProgress,
    getRecentRecords,
    quickActions,
    clearError: () => setError(null),
  };
};

// Helper function to validate habit data
const validateHabitData = (habitType, data) => {
  const validatedData = { ...data };

  switch (habitType) {
    case "exercise":
      if (validatedData.duration && validatedData.duration < 0) {
        throw new Error("La duración debe ser positiva");
      }
      if (validatedData.calories && validatedData.calories < 0) {
        throw new Error("Las calorías deben ser positivas");
      }
      if (validatedData.exercises && validatedData.exercises < 0) {
        throw new Error("El número de ejercicios debe ser positivo");
      }
      break;

    case "sleep":
      if (
        validatedData.duration &&
        (validatedData.duration < 0 || validatedData.duration > 24)
      ) {
        throw new Error("La duración del sueño debe estar entre 0 y 24 horas");
      }
      if (
        validatedData.quality &&
        (validatedData.quality < 1 || validatedData.quality > 10)
      ) {
        throw new Error("La calidad del sueño debe estar entre 1 y 10");
      }
      break;

    case "nutrition":
      if (validatedData.calories && validatedData.calories < 0) {
        throw new Error("Las calorías deben ser positivas");
      }
      if (validatedData.water && validatedData.water < 0) {
        throw new Error("Los vasos de agua deben ser positivos");
      }
      if (validatedData.meals && validatedData.meals < 0) {
        throw new Error("El número de comidas debe ser positivo");
      }
      break;
  }

  return validatedData;
};

export default useHabitTracker;
