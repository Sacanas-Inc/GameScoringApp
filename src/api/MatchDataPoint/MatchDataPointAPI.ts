import { BASE_URL } from "../api";

const url = (param: string | number) => {
  return {
    getAllMatchDataPoints: `match/${param}`,
    postMatchDataPoint: `match-data-point/${param}`,
  };
};

export const GetMatchDataPoints = async (param?: any) => {
  return await fetch(BASE_URL + url(param).getAllMatchDataPoints, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const PostMatchDataPoints = async (
  matchId: string | number,
  param?: any
) => {
  return await fetch(BASE_URL + url(matchId).postMatchDataPoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: param,
  });
};
