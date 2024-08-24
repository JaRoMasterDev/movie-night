"use server";
import { DetailedMovie } from "@/lib/types/detailed-movie";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: process.env.TMDB_TOKEN as string,
  },
};

export async function fetchMovieDetails(id: number): Promise<DetailedMovie> {
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
    options,
  ).then((response) => response.json() as Promise<DetailedMovie>);
}
