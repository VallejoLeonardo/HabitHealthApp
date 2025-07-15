/**
 * Validation utilities for form inputs
 */

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid
 */
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate required field
 * @param {any} value - Value to validate
 * @returns {boolean} True if not empty
 */
export const validateRequired = (value) => {
  if (typeof value === "string") {
    return value.trim().length > 0;
  }
  return value !== null && value !== undefined;
};

/**
 * Validate number range
 * @param {number} value - Value to validate
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {boolean} True if in range
 */
export const validateNumberRange = (value, min, max) => {
  const num = parseFloat(value);
  return !isNaN(num) && num >= min && num <= max;
};

/**
 * Validate string length
 * @param {string} value - String to validate
 * @param {number} minLength - Minimum length
 * @param {number} maxLength - Maximum length
 * @returns {boolean} True if valid length
 */
export const validateStringLength = (
  value,
  minLength = 0,
  maxLength = Infinity
) => {
  if (typeof value !== "string") return false;
  return value.length >= minLength && value.length <= maxLength;
};

/**
 * Validate exercise data
 * @param {object} data - Exercise data
 * @returns {object} Validation result
 */
export const validateExerciseData = (data) => {
  const errors = {};

  if (!validateRequired(data.type)) {
    errors.type = "El tipo de ejercicio es requerido";
  }

  if (!validateNumberRange(data.duration, 1, 480)) {
    errors.duration = "La duración debe estar entre 1 y 480 minutos";
  }

  if (data.calories && !validateNumberRange(data.calories, 1, 2000)) {
    errors.calories = "Las calorías deben estar entre 1 y 2000";
  }

  if (data.intensity && !validateNumberRange(data.intensity, 1, 3)) {
    errors.intensity = "La intensidad debe estar entre 1 y 3";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Validate sleep data
 * @param {object} data - Sleep data
 * @returns {object} Validation result
 */
export const validateSleepData = (data) => {
  const errors = {};

  if (!validateRequired(data.bedtime)) {
    errors.bedtime = "La hora de dormir es requerida";
  }

  if (!validateRequired(data.wakeupTime)) {
    errors.wakeupTime = "La hora de despertar es requerida";
  }

  if (!validateNumberRange(data.duration, 1, 24)) {
    errors.duration = "La duración debe estar entre 1 y 24 horas";
  }

  if (!validateNumberRange(data.quality, 1, 10)) {
    errors.quality = "La calidad debe estar entre 1 y 10";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Validate nutrition data
 * @param {object} data - Nutrition data
 * @returns {object} Validation result
 */
export const validateNutritionData = (data) => {
  const errors = {};

  if (data.calories && !validateNumberRange(data.calories, 1, 5000)) {
    errors.calories = "Las calorías deben estar entre 1 y 5000";
  }

  if (data.water && !validateNumberRange(data.water, 0, 20)) {
    errors.water = "Los vasos de agua deben estar entre 0 y 20";
  }

  if (data.meals && !validateNumberRange(data.meals, 0, 10)) {
    errors.meals = "Las comidas deben estar entre 0 y 10";
  }

  if (data.protein && !validateNumberRange(data.protein, 0, 300)) {
    errors.protein = "La proteína debe estar entre 0 y 300 gramos";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Get validation error message for habit data
 * @param {string} habitType - Type of habit
 * @param {object} data - Data to validate
 * @returns {object} Validation result
 */
export const validateHabitData = (habitType, data) => {
  switch (habitType) {
    case "exercise":
      return validateExerciseData(data);
    case "sleep":
      return validateSleepData(data);
    case "nutrition":
      return validateNutritionData(data);
    default:
      return { isValid: true, errors: {} };
  }
};
