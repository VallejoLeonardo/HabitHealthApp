/**
 * App Context - Main context provider for global state management
 * Combines user, habits, and records contexts
 */

import React, { createContext, useContext, useReducer, useEffect } from "react";

// Import individual contexts
import { UserProvider, UserContext } from "./UserContext";
import { HabitsProvider, HabitsContext } from "./HabitsContext";
import { RecordsProvider, RecordsContext } from "./RecordsContext";

// Create main app context
const AppContext = createContext();

// App state initial values
const initialAppState = {
  isLoading: false,
  isInitialized: false,
  error: null,
};

// App reducer
const appReducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    case "SET_INITIALIZED":
      return { ...state, isInitialized: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "CLEAR_ERROR":
      return { ...state, error: null };
    default:
      return state;
  }
};

// App provider component
const AppProvider = ({ children }) => {
  const [appState, appDispatch] = useReducer(appReducer, initialAppState);

  // Initialize app data
  useEffect(() => {
    const initializeApp = async () => {
      try {
        appDispatch({ type: "SET_LOADING", payload: true });

        // Simulate initialization delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Here you would load initial data from storage
        // await loadUserData();
        // await loadHabitsData();
        // await loadRecordsData();

        appDispatch({ type: "SET_INITIALIZED", payload: true });
      } catch (error) {
        appDispatch({ type: "SET_ERROR", payload: error.message });
      } finally {
        appDispatch({ type: "SET_LOADING", payload: false });
      }
    };

    initializeApp();
  }, []);

  const appActions = {
    setLoading: (loading) =>
      appDispatch({ type: "SET_LOADING", payload: loading }),
    setError: (error) => appDispatch({ type: "SET_ERROR", payload: error }),
    clearError: () => appDispatch({ type: "CLEAR_ERROR" }),
  };

  return (
    <AppContext.Provider value={{ appState, appActions }}>
      <UserProvider>
        <HabitsProvider>
          <RecordsProvider>{children}</RecordsProvider>
        </HabitsProvider>
      </UserProvider>
    </AppContext.Provider>
  );
};

// Hook to use app context
const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};

// Hook to use all contexts
const useAppContext = () => {
  const app = useApp();
  const user = useContext(UserContext);
  const habits = useContext(HabitsContext);
  const records = useContext(RecordsContext);

  return {
    app,
    user,
    habits,
    records,
  };
};

export {
  AppProvider,
  useApp,
  useAppContext,
  UserContext,
  HabitsContext,
  RecordsContext,
};

export default AppContext;
