"use server";

import { DetailedMovie } from "@/lib/types/detailed-movie";
import { fetchMovieKeywords } from "@/lib/api/movie-keywords";
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

export async function findSimilarMovies(
  a: DetailedMovie,
  b: DetailedMovie,
  page: number = 1,
): Promise<Response> {
  let genres = [...a.genres, ...b.genres];
  genres = genres.filter(
    (genre, index) => genres.findIndex((g) => g.id === genre.id) === index,
  );

  const keyWordsA = await fetchMovieKeywords(a.id);
  const keyWordsB = await fetchMovieKeywords(b.id);
  const keywords = keyWordsA.keywords.filter((keyword) =>
    keyWordsB.keywords.some((k) => k.id === keyword.id),
  );

  // Date range between the two movies +/- 1 year
  const releaseDateA = new Date(a.release_date);
  const releaseDateB = new Date(b.release_date);
  const minDate = new Date(
    Math.min(releaseDateA.getTime(), releaseDateB.getTime()),
  );
  const maxDate = new Date(
    Math.max(releaseDateA.getTime(), releaseDateB.getTime()),
  );
  minDate.setFullYear(minDate.getFullYear() - 1);
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  const dateGte = minDate.toISOString().split("T")[0];
  const dateLte = maxDate.toISOString().split("T")[0];
  const withGenres = genres.map((g) => g.name).join(",");
  const withKeywords = keywords.map((k) => k.id).join(",");

  return fetch(
    `https://api.themoviedb.org/3/discover/movie?include_adult=true&include_video=false&language=en-US&page=${page}&release_date.gte=${dateGte}&release_date.lte=${dateLte}&with_grenres=${withGenres}&with_keywords=${withKeywords}`,
    options,
  ).then((res) => res.json() as Promise<Response>);
}
