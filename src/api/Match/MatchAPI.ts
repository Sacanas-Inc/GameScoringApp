import { BASE_URL } from "../api";

const url = (param?: string | number) => {
  return {
    getAllMatches: "matches?includeDataPoints=true",
    getAllMatchesByGameId: `matches?includeDataPoints=true&gameId=${param}`,

    getMatchById: `match/${param}?includeDataPoints=true`, // 'https://gamescoringapi.azurewebsites.net/match/6?includeDataPoints=true'
    postMatch: "match",
    deleteMatchAndDataPoints: `match-data-point/${param}`,
  };
};

export const GetAllMatches = async (param?: any) => {
  return await fetch(BASE_URL + url(param).getAllMatches, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const GetAllMatchesByGameId = async (param?: any) => {
  return await fetch(BASE_URL + url(param).getAllMatchesByGameId, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const GetMatchById = async (param?: any) => {
  return await fetch(BASE_URL + url(param).getMatchById, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const PostMatch = async (param?: any) => {
  return await fetch(BASE_URL + url().postMatch, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(param),
  });
};

export const DeleteMatch = async (param?: any) => {
  return await fetch(BASE_URL + url(param).deleteMatchAndDataPoints, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
