import axios from "axios";

export const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

interface ApiErrorBody {
  error?: unknown;
  errors?: unknown;
}

/**
 * Extracts the useful message from an API error.
 *
 * The API returns `{ "error": "..." }` for most failures and
 * `{ "errors": ["...", "..."] }` for validation failures. Anything else falls
 * back to the underlying `Error.message` so callers always get a string.
 */
export const getApiErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as ApiErrorBody | undefined;
    if (data) {
      if (typeof data.error === "string" && data.error.length > 0) {
        return data.error;
      }
      if (Array.isArray(data.errors)) {
        const messages = data.errors.filter(
          (message): message is string => typeof message === "string"
        );
        if (messages.length > 0) {
          return messages.join(", ");
        }
      }
    }
    return error.message;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return String(error);
};
