/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosResponse } from "axios";
import { instance } from "@api/apiUtils";

const url = (param?: string | number) => ({
  getAllGames: "games",
  getGameById: `game/${param}`,
  postGame: "game",
  deleteGameById: `game/${param}`
});

export const GetAllGames = async (param?: any): Promise<AxiosResponse> =>
  instance.get(url(param).getAllGames);

export const GetGameById = async (param?: any): Promise<AxiosResponse> =>
  instance.get(url(param).getGameById);

export const PostGame = async (param?: any): Promise<AxiosResponse> =>
  instance.post(url().postGame, param);

export const DeleteGame = async (param?: any): Promise<AxiosResponse> =>
  instance.delete(url(param).deleteGameById);