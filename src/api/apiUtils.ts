import axios from "axios";

export const BASE_URL = "https://gamescoringapi.azurewebsites.net/"; // this should be in an env file with github secrets or something similar, its fine as a personal project.

export const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json"
  },
});