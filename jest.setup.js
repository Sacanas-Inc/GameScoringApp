import '@testing-library/jest-dom/extend-expect';

// Suppress specific errors and warnings
const originalConsoleError = console.error;
const originalConsoleWarn = console.warn;

console.error = (...args) => {
  if (typeof args[0] === 'string' && args[0].includes('Could not parse CSS stylesheet')) {
    return;
  }
  originalConsoleError(...args);
};

console.warn = (...args) => {
  if (typeof args[0] === 'string' && args[0].includes('Warning you want to suppress')) {
    return;
  }
  originalConsoleWarn(...args);
};
