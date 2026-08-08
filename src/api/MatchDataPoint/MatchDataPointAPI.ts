/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosResponse } from "axios";
import { instance } from "@api/apiUtils";

const url = (param: string | number) => ({
  getAllMatchDataPoints: `match/${param}`,
  postMatchDataPoint: `match-data-point/${param}`
});

export const GetMatchDataPoints = async (
  param?: any
): Promise<AxiosResponse> => instance.get(url(param).getAllMatchDataPoints);

export const PostMatchDataPoints = async (
  matchId: string | number,
  param?: any
): Promise<AxiosResponse> => instance.post(url(matchId).postMatchDataPoint, param);