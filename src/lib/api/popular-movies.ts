"use server";
import { Movie } from "@/lib/types/movie";

type Response = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: process.env.TMDB_TOKEN as string,
  },
};

export async function fetchPopularMovies(page = 1): Promise<Response> {
  return fetch(
    `https://api.themoviedb.org/3/discover/movie?include_adult=true&language=en-US&page=${page}&sort_by=popularity.desc`,
    options,
  ).then((response) => response.json() as Promise<Response>);
}
