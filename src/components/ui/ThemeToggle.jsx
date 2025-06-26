import React from 'react';

const ThemeToggle = ({ darkMode, setDarkMode }) => {
  return (
    <button
      onClick={() => setDarkMode((prev) => !prev)}
      className="ml-4 px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 border border-gray-300 dark:border-gray-600 transition"
      aria-label="Toggle dark mode"
    >
      {darkMode ? '🌙 Night' : '☀️ Day'}
    </button>
  );
};

export default ThemeToggle;
