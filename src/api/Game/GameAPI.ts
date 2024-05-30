import { BASE_URL } from "../api";

const url = (param?: string | number) => {
  return {
    getAllGames: "games",
    getGameById: `game/${param}`,
    postGame: "game",
    deleteGameById: `game/${param}`,
  };
};

export const GetAllGames = async (param?: any) => {
  return await fetch(BASE_URL + url(param).getAllGames, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const GetGameById = async (param?: any) => {
  return await fetch(BASE_URL + url(param).getGameById, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const PostGame = async (param?: any) => {
  return await fetch(BASE_URL + url().postGame, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(param),
  });
};

export const DeleteGame = async (param?: any) => {
  return await fetch(BASE_URL + url(param).deleteGameById, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
