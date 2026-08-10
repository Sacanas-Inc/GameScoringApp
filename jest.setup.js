/* eslint-disable no-console */
import { TextDecoder, TextEncoder } from "util";
import "@testing-library/jest-dom";

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Suppress specific errors and warnings
const originalConsoleError = console.error;
const originalConsoleWarn = console.warn;

console.error = (...args) => {
  if (
    typeof args[0] === "string" &&
    args[0].includes("Could not parse CSS stylesheet")
  ) {
    return;
  }
  originalConsoleError(...args);
};

console.warn = (...args) => {
  if (
    typeof args[0] === "string" &&
    args[0].includes("Warning you want to suppress")
  ) {
    return;
  }
  originalConsoleWarn(...args);
};
