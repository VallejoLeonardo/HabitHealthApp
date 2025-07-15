/**
 * Records Context - Manages daily habit records and historical data
 */

import React, { createContext, useContext, useReducer } from "react";

// Records context
const RecordsContext = createContext();

// Helper function to generate date key
const getDateKey = (date = new Date()) => {
  return date.toISOString().split("T")[0]; // YYYY-MM-DD format
};

// Generate mock data for the last 30 days
const generateMockData = () => {
  const records = {};
  const today = new Date();

  for (let i = 0; i < 30; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateKey = getDateKey(date);

    records[dateKey] = {
      exercise: {
        duration: Math.floor(Math.random() * 90) + 15, // 15-105 minutes
        calories: Math.floor(Math.random() * 400) + 100, // 100-500 calories
        exercises: Math.floor(Math.random() * 4) + 1, // 1-5 exercises
        type: ["running", "cycling", "swimming", "gym"][
          Math.floor(Math.random() * 4)
        ],
        intensity: Math.floor(Math.random() * 3) + 1, // 1-3 (low, medium, high)
        notes: i % 3 === 0 ? "Gran sesión de entrenamiento" : "",
        timestamp: date.toISOString(),
      },
      sleep: {
        duration: Math.random() * 3 + 6, // 6-9 hours
        quality: Math.floor(Math.random() * 4) + 6, // 6-10
        bedtime:
          "23:" +
          Math.floor(Math.random() * 60)
            .toString()
            .padStart(2, "0"),
        wakeupTime:
          "0" +
          (Math.floor(Math.random() * 3) + 6) +
          ":" +
          Math.floor(Math.random() * 60)
            .toString()
            .padStart(2, "0"),
        notes: i % 4 === 0 ? "Desperté sintiéndome descansado" : "",
        timestamp: date.toISOString(),
      },
      nutrition: {
        calories: Math.floor(Math.random() * 800) + 1500, // 1500-2300 calories
        water: Math.floor(Math.random() * 4) + 6, // 6-10 glasses
        meals: Math.floor(Math.random() * 3) + 3, // 3-6 meals
        protein: Math.floor(Math.random() * 80) + 100, // 100-180g
        notes: i % 5 === 0 ? "Comí más verduras hoy" : "",
        timestamp: date.toISOString(),
      },
    };
  }

  return records;
};

// Initial records state
const initialRecordsState = {
  records: generateMockData(),
  todayRecords: {},
  isLoading: false,
  lastSync: new Date().toISOString(),
};

// Records reducer
const recordsReducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      };

    case "ADD_RECORD":
      const { date, habitType, data } = action.payload;
      const dateKey = date ? getDateKey(new Date(date)) : getDateKey();

      return {
        ...state,
        records: {
          ...state.records,
          [dateKey]: {
            ...state.records[dateKey],
            [habitType]: {
              ...data,
              timestamp: new Date().toISOString(),
            },
          },
        },
        todayRecords:
          dateKey === getDateKey()
            ? {
                ...state.todayRecords,
                [habitType]: data,
              }
            : state.todayRecords,
      };

    case "UPDATE_RECORD":
      const updateDateKey = action.payload.date
        ? getDateKey(new Date(action.payload.date))
        : getDateKey();

      return {
        ...state,
        records: {
          ...state.records,
          [updateDateKey]: {
            ...state.records[updateDateKey],
            [action.payload.habitType]: {
              ...state.records[updateDateKey]?.[action.payload.habitType],
              ...action.payload.data,
              timestamp: new Date().toISOString(),
            },
          },
        },
      };

    case "DELETE_RECORD":
      const deleteDateKey = action.payload.date
        ? getDateKey(new Date(action.payload.date))
        : getDateKey();

      if (state.records[deleteDateKey]) {
        const { [action.payload.habitType]: deleted, ...remainingRecords } =
          state.records[deleteDateKey];

        return {
          ...state,
          records: {
            ...state.records,
            [deleteDateKey]: remainingRecords,
          },
        };
      }
      return state;

    case "LOAD_TODAY_RECORDS":
      const todayKey = getDateKey();
      return {
        ...state,
        todayRecords: state.records[todayKey] || {},
      };

    case "CLEAR_RECORDS":
      return {
        ...state,
        records: {},
        todayRecords: {},
      };

    case "SET_LAST_SYNC":
      return {
        ...state,
        lastSync: action.payload || new Date().toISOString(),
      };

    default:
      return state;
  }
};

// Records provider component
const RecordsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(recordsReducer, initialRecordsState);

  // Actions
  const actions = {
    addRecord: (habitType, data, date = null) => {
      dispatch({
        type: "ADD_RECORD",
        payload: { habitType, data, date },
      });
    },

    updateRecord: (habitType, data, date = null) => {
      dispatch({
        type: "UPDATE_RECORD",
        payload: { habitType, data, date },
      });
    },

    deleteRecord: (habitType, date = null) => {
      dispatch({
        type: "DELETE_RECORD",
        payload: { habitType, date },
      });
    },

    loadTodayRecords: () => {
      dispatch({ type: "LOAD_TODAY_RECORDS" });
    },

    clearRecords: () => {
      dispatch({ type: "CLEAR_RECORDS" });
    },

    setLoading: (loading) => {
      dispatch({ type: "SET_LOADING", payload: loading });
    },

    setLastSync: (timestamp) => {
      dispatch({ type: "SET_LAST_SYNC", payload: timestamp });
    },
  };

  // Computed values and utilities
  const computed = {
    getTodayRecord: (habitType) => {
      const todayKey = getDateKey();
      return state.records[todayKey]?.[habitType] || null;
    },

    getRecordByDate: (habitType, date) => {
      const dateKey = getDateKey(new Date(date));
      return state.records[dateKey]?.[habitType] || null;
    },

    getRecordsInRange: (habitType, startDate, endDate) => {
      const records = [];
      const start = new Date(startDate);
      const end = new Date(endDate);

      for (
        let date = new Date(start);
        date <= end;
        date.setDate(date.getDate() + 1)
      ) {
        const dateKey = getDateKey(date);
        const record = state.records[dateKey]?.[habitType];
        if (record) {
          records.push({
            date: dateKey,
            ...record,
          });
        }
      }

      return records;
    },

    getWeeklyData: (habitType) => {
      const today = new Date();
      const weekAgo = new Date(today);
      weekAgo.setDate(weekAgo.getDate() - 6);

      return computed.getRecordsInRange(habitType, weekAgo, today);
    },

    getMonthlyData: (habitType) => {
      const today = new Date();
      const monthAgo = new Date(today);
      monthAgo.setDate(monthAgo.getDate() - 29);

      return computed.getRecordsInRange(habitType, monthAgo, today);
    },

    getCompletionStats: (habitType, days = 7) => {
      const records = computed.getRecordsInRange(
        habitType,
        new Date(Date.now() - days * 24 * 60 * 60 * 1000),
        new Date()
      );

      const totalDays = days;
      const completedDays = records.length;
      const completionRate = (completedDays / totalDays) * 100;

      return {
        totalDays,
        completedDays,
        completionRate: Math.round(completionRate),
        records,
      };
    },
  };

  return (
    <RecordsContext.Provider value={{ state, actions, computed }}>
      {children}
    </RecordsContext.Provider>
  );
};

// Hook to use records context
const useRecords = () => {
  const context = useContext(RecordsContext);
  if (!context) {
    throw new Error("useRecords must be used within a RecordsProvider");
  }
  return context;
};

export { RecordsProvider, RecordsContext, useRecords };
