/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosResponse } from "axios";
import { instance } from "@api/apiUtils";

const url = (param?: string | number) => ({
  getAllMatches: "matches?includeDataPoints=true",
  getAllMatchesByGameId: `matches?includeDataPoints=true&gameId=${param}`,
  getMatchById: `match/${param}?includeDataPoints=true`,
  postMatch: "match",
  deleteMatchAndDataPoints: `/match-and-data-points/${param}`
});

export const GetAllMatches = async (param?: any): Promise<AxiosResponse> =>
  instance.get(url(param).getAllMatches);

export const GetAllMatchesByGameId = async (
  param?: any
): Promise<AxiosResponse> => instance.get(url(param).getAllMatchesByGameId);

export const GetMatchById = async (param?: any): Promise<AxiosResponse> =>
  instance.get(url(param).getMatchById);

export const PostMatch = async (param?: any): Promise<AxiosResponse> =>
  instance.post(url().postMatch, param);

export const DeleteMatch = async (param?: any): Promise<AxiosResponse> =>
  instance.delete(url(param).deleteMatchAndDataPoints);