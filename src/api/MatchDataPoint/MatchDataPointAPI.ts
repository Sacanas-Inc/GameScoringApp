/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosResponse } from "axios";
import { instance } from "@api/apiUtils";

const url = (param: string | number) => ({
  postMatchDataPoint: `match-data-point/${param}`
});

export const PostMatchDataPoints = async (
  matchId: string | number,
  param?: any
): Promise<AxiosResponse> => instance.post(url(matchId).postMatchDataPoint, param);