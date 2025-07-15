/**
 * Habits Context - Manages habit definitions and goals
 */

import React, { createContext, useContext, useReducer } from "react";

// Habits context
const HabitsContext = createContext();

// Initial habits state
const initialHabitsState = {
  habits: {
    exercise: {
      id: "exercise",
      name: "Ejercicio",
      icon: "fitness",
      color: "#FF5722",
      isActive: true,
      goals: {
        duration: 60, // minutes
        frequency: 5, // days per week
        calories: 400,
        exercises: 3, // number of exercises
      },
      targets: {
        daily: {
          duration: 60,
          calories: 400,
          exercises: 3,
        },
        weekly: {
          duration: 300, // 5 days * 60 minutes
          calories: 2000,
          exercises: 15,
        },
      },
    },
    sleep: {
      id: "sleep",
      name: "Sueño",
      icon: "moon",
      color: "#3F51B5",
      isActive: true,
      goals: {
        duration: 8, // hours
        quality: 8, // 1-10 scale
        bedtime: "23:00",
        wakeupTime: "07:00",
      },
      targets: {
        daily: {
          duration: 8,
          quality: 8,
        },
        weekly: {
          averageDuration: 8,
          averageQuality: 8,
        },
      },
    },
    nutrition: {
      id: "nutrition",
      name: "Nutrición",
      icon: "restaurant",
      color: "#4CAF50",
      isActive: true,
      goals: {
        calories: 2000,
        water: 8, // glasses
        meals: 5, // number of meals
        protein: 150, // grams
      },
      targets: {
        daily: {
          calories: 2000,
          water: 8,
          meals: 5,
          protein: 150,
        },
        weekly: {
          calories: 14000,
          water: 56,
          meals: 35,
          protein: 1050,
        },
      },
    },
  },
  activeHabits: ["exercise", "sleep", "nutrition"],
  habitOrder: ["exercise", "sleep", "nutrition"],
};

// Habits reducer
const habitsReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_HABIT_GOALS":
      return {
        ...state,
        habits: {
          ...state.habits,
          [action.payload.habitId]: {
            ...state.habits[action.payload.habitId],
            goals: {
              ...state.habits[action.payload.habitId].goals,
              ...action.payload.goals,
            },
          },
        },
      };

    case "UPDATE_HABIT_TARGETS":
      return {
        ...state,
        habits: {
          ...state.habits,
          [action.payload.habitId]: {
            ...state.habits[action.payload.habitId],
            targets: {
              ...state.habits[action.payload.habitId].targets,
              ...action.payload.targets,
            },
          },
        },
      };

    case "TOGGLE_HABIT_ACTIVE":
      const habit = state.habits[action.payload.habitId];
      const newActiveState = !habit.isActive;

      return {
        ...state,
        habits: {
          ...state.habits,
          [action.payload.habitId]: {
            ...habit,
            isActive: newActiveState,
          },
        },
        activeHabits: newActiveState
          ? [...state.activeHabits, action.payload.habitId]
          : state.activeHabits.filter((id) => id !== action.payload.habitId),
      };

    case "REORDER_HABITS":
      return {
        ...state,
        habitOrder: action.payload.newOrder,
      };

    case "ADD_CUSTOM_HABIT":
      const newHabitId = action.payload.id || `habit-${Date.now()}`;
      return {
        ...state,
        habits: {
          ...state.habits,
          [newHabitId]: {
            id: newHabitId,
            isActive: true,
            ...action.payload,
          },
        },
        activeHabits: [...state.activeHabits, newHabitId],
        habitOrder: [...state.habitOrder, newHabitId],
      };

    case "REMOVE_HABIT":
      const { [action.payload.habitId]: removedHabit, ...remainingHabits } =
        state.habits;
      return {
        ...state,
        habits: remainingHabits,
        activeHabits: state.activeHabits.filter(
          (id) => id !== action.payload.habitId
        ),
        habitOrder: state.habitOrder.filter(
          (id) => id !== action.payload.habitId
        ),
      };

    case "RESET_HABITS":
      return initialHabitsState;

    default:
      return state;
  }
};

// Habits provider component
const HabitsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(habitsReducer, initialHabitsState);

  // Actions
  const actions = {
    updateHabitGoals: (habitId, goals) => {
      dispatch({
        type: "UPDATE_HABIT_GOALS",
        payload: { habitId, goals },
      });
    },

    updateHabitTargets: (habitId, targets) => {
      dispatch({
        type: "UPDATE_HABIT_TARGETS",
        payload: { habitId, targets },
      });
    },

    toggleHabitActive: (habitId) => {
      dispatch({
        type: "TOGGLE_HABIT_ACTIVE",
        payload: { habitId },
      });
    },

    reorderHabits: (newOrder) => {
      dispatch({
        type: "REORDER_HABITS",
        payload: { newOrder },
      });
    },

    addCustomHabit: (habitData) => {
      dispatch({
        type: "ADD_CUSTOM_HABIT",
        payload: habitData,
      });
    },

    removeHabit: (habitId) => {
      dispatch({
        type: "REMOVE_HABIT",
        payload: { habitId },
      });
    },

    resetHabits: () => {
      dispatch({ type: "RESET_HABITS" });
    },
  };

  // Computed values
  const computed = {
    getHabitById: (habitId) => state.habits[habitId],
    getActiveHabits: () => state.activeHabits.map((id) => state.habits[id]),
    getOrderedHabits: () => state.habitOrder.map((id) => state.habits[id]),
    getActiveOrderedHabits: () =>
      state.habitOrder
        .filter((id) => state.activeHabits.includes(id))
        .map((id) => state.habits[id]),
  };

  return (
    <HabitsContext.Provider value={{ state, actions, computed }}>
      {children}
    </HabitsContext.Provider>
  );
};

// Hook to use habits context
const useHabits = () => {
  const context = useContext(HabitsContext);
  if (!context) {
    throw new Error("useHabits must be used within a HabitsProvider");
  }
  return context;
};

export { HabitsProvider, HabitsContext, useHabits };
