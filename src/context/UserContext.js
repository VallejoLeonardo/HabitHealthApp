/**
 * User Context - Manages user information and preferences
 */

import React, { createContext, useContext, useReducer } from "react";

// User context
const UserContext = createContext();

// Initial user state
const initialUserState = {
  profile: {
    id: "user-1",
    name: "Usuario Demo",
    email: "demo@habithealth.com",
    age: 30,
    weight: 70,
    height: 175,
    goal: "Mantener un estilo de vida saludable",
    avatar: null,
    joinDate: new Date().toISOString(),
  },
  preferences: {
    notifications: {
      exerciseReminders: true,
      sleepReminders: true,
      nutritionReminders: false,
      weeklyReports: true,
    },
    theme: "light",
    units: "metric", // metric or imperial
    language: "es",
  },
  stats: {
    activeDays: 45,
    completionRate: 87,
    currentStreak: 12,
    bestStreak: 15,
    totalHabits: 3,
  },
};

// User reducer
const userReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_PROFILE":
      return {
        ...state,
        profile: {
          ...state.profile,
          ...action.payload,
        },
      };

    case "UPDATE_PREFERENCES":
      return {
        ...state,
        preferences: {
          ...state.preferences,
          ...action.payload,
        },
      };

    case "UPDATE_NOTIFICATION_PREFERENCE":
      return {
        ...state,
        preferences: {
          ...state.preferences,
          notifications: {
            ...state.preferences.notifications,
            [action.payload.key]: action.payload.value,
          },
        },
      };

    case "UPDATE_STATS":
      return {
        ...state,
        stats: {
          ...state.stats,
          ...action.payload,
        },
      };

    case "RESET_USER_DATA":
      return initialUserState;

    default:
      return state;
  }
};

// User provider component
const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialUserState);

  // Actions
  const actions = {
    updateProfile: (profileData) => {
      dispatch({ type: "UPDATE_PROFILE", payload: profileData });
    },

    updatePreferences: (preferences) => {
      dispatch({ type: "UPDATE_PREFERENCES", payload: preferences });
    },

    updateNotificationPreference: (key, value) => {
      dispatch({
        type: "UPDATE_NOTIFICATION_PREFERENCE",
        payload: { key, value },
      });
    },

    updateStats: (stats) => {
      dispatch({ type: "UPDATE_STATS", payload: stats });
    },

    resetUserData: () => {
      dispatch({ type: "RESET_USER_DATA" });
    },
  };

  return (
    <UserContext.Provider value={{ state, actions }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook to use user context
const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export { UserProvider, UserContext, useUser };
