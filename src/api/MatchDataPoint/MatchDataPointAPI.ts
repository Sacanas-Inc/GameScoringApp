/* eslint-disable @typescript-eslint/no-explicit-any */
import { BASE_URL } from "@api/apiUtils";

const url = (param: string | number) => ({
  getAllMatchDataPoints: `match/${param}`,
  postMatchDataPoint: `match-data-point/${param}`
});

export const GetMatchDataPoints = async (param?: any) =>
  fetch(BASE_URL + url(param).getAllMatchDataPoints, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });

export const PostMatchDataPoints = async (
  matchId: string | number,
  param?: any
) =>
  fetch(BASE_URL + url(matchId).postMatchDataPoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: param
  });
