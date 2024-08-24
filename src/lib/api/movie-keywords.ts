"use server";

interface Response {
  id: number;
  keywords: {
    id: number;
    name: string;
  }[];
}
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: process.env.TMDB_TOKEN as string,
  },
};

export async function fetchMovieKeywords(id: number): Promise<Response> {
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}/keywords`,
    options,
  ).then((response) => response.json() as Promise<Response>);
}
