/**
 * Date utilities for the habit tracking app
 */

/**
 * Format date to readable string
 * @param {Date|string} date - Date to format
 * @param {string} locale - Locale for formatting (default: 'es-ES')
 * @returns {string} Formatted date string
 */
export const formatDate = (date, locale = "es-ES") => {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return dateObj.toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

/**
 * Format date to short string
 * @param {Date|string} date - Date to format
 * @param {string} locale - Locale for formatting (default: 'es-ES')
 * @returns {string} Short formatted date string
 */
export const formatDateShort = (date, locale = "es-ES") => {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return dateObj.toLocaleDateString(locale, {
    month: "short",
    day: "numeric",
  });
};

/**
 * Format time to readable string
 * @param {Date|string} date - Date to format
 * @param {string} locale - Locale for formatting (default: 'es-ES')
 * @returns {string} Formatted time string
 */
export const formatTime = (date, locale = "es-ES") => {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return dateObj.toLocaleTimeString(locale, {
    hour: "2-digit",
    minute: "2-digit",
  });
};

/**
 * Get date key in YYYY-MM-DD format
 * @param {Date} date - Date object (default: today)
 * @returns {string} Date key
 */
export const getDateKey = (date = new Date()) => {
  return date.toISOString().split("T")[0];
};

/**
 * Check if date is today
 * @param {Date|string} date - Date to check
 * @returns {boolean} True if date is today
 */
export const isToday = (date) => {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  const today = new Date();
  return getDateKey(dateObj) === getDateKey(today);
};

/**
 * Get days difference between two dates
 * @param {Date|string} date1 - First date
 * @param {Date|string} date2 - Second date
 * @returns {number} Days difference
 */
export const getDaysDifference = (date1, date2) => {
  const d1 = typeof date1 === "string" ? new Date(date1) : date1;
  const d2 = typeof date2 === "string" ? new Date(date2) : date2;
  const diffTime = Math.abs(d2 - d1);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

/**
 * Get week start date (Monday)
 * @param {Date} date - Reference date (default: today)
 * @returns {Date} Week start date
 */
export const getWeekStart = (date = new Date()) => {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
  return new Date(d.setDate(diff));
};

/**
 * Get month start date
 * @param {Date} date - Reference date (default: today)
 * @returns {Date} Month start date
 */
export const getMonthStart = (date = new Date()) => {
  const d = new Date(date);
  return new Date(d.getFullYear(), d.getMonth(), 1);
};

/**
 * Get array of dates in range
 * @param {Date|string} startDate - Start date
 * @param {Date|string} endDate - End date
 * @returns {Date[]} Array of dates
 */
export const getDateRange = (startDate, endDate) => {
  const start = typeof startDate === "string" ? new Date(startDate) : startDate;
  const end = typeof endDate === "string" ? new Date(endDate) : endDate;
  const dates = [];

  for (
    let date = new Date(start);
    date <= end;
    date.setDate(date.getDate() + 1)
  ) {
    dates.push(new Date(date));
  }

  return dates;
};

/**
 * Get relative time string (e.g., "hace 2 horas")
 * @param {Date|string} date - Date to compare
 * @param {string} locale - Locale for formatting (default: 'es-ES')
 * @returns {string} Relative time string
 */
export const getRelativeTime = (date, locale = "es-ES") => {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  const now = new Date();
  const diffMs = now - dateObj;
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSecs < 60) {
    return "Ahora mismo";
  } else if (diffMins < 60) {
    return `Hace ${diffMins} minuto${diffMins > 1 ? "s" : ""}`;
  } else if (diffHours < 24) {
    return `Hace ${diffHours} hora${diffHours > 1 ? "s" : ""}`;
  } else if (diffDays < 7) {
    return `Hace ${diffDays} día${diffDays > 1 ? "s" : ""}`;
  } else {
    return formatDateShort(dateObj, locale);
  }
};
