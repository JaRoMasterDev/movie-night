"use client";
import { useEffect, useState } from "react";
import { DetailedMovie } from "@/lib/types/detailed-movie";
import { fetchMovieDetails } from "@/lib/api/movie-details";
import MovieCard from "@/components/movie-card";
import { findSimilarMovies } from "@/lib/api/similar-movie";
import { Movie } from "@/lib/types/movie";
import Page from "@/components/page";

interface Props {
  params: {
    movie1: string;
    movie2: string;
  };
}

export default function MovieMatchResult(props: Props) {
  const [movie1Details, setMovie1Details] = useState<DetailedMovie | null>(
    null,
  );
  const [movie2Details, setMovie2Details] = useState<DetailedMovie | null>(
    null,
  );
  const [relatedMovies, setRelatedMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [currentMovie, setCurrentMovie] = useState<number | null>(null);
  const [fullyLoaded, setFullyLoaded] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      const movie1DetailsPromise = fetchMovieDetails(+props.params.movie1);
      const movie2DetailsPromise = fetchMovieDetails(+props.params.movie2);

      const [movie1Details, movie2Details] = await Promise.all([
        movie1DetailsPromise,
        movie2DetailsPromise,
      ]);

      setMovie1Details(movie1Details);
      setMovie2Details(movie2Details);
    };

    fetchMovies().catch(console.error);
  }, [props.params]);

  useEffect(() => {
    if (movie1Details && movie2Details)
      findSimilarMovies(movie1Details, movie2Details, page)
        .then((res) => {
          const filtered = res.results.filter(
            (m) => m.id !== movie1Details.id && m.id !== movie2Details.id,
          );
          setRelatedMovies(filtered);
          setCurrentMovie(Math.floor(Math.random() * filtered.length));
          setFullyLoaded(filtered.length === 0);
        })
        .catch(console.error);
  }, [movie1Details, movie2Details, page]);

  return (
    <Page>
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-4xl font-bold text-primary">
          The perfect match for
        </h1>
        <div className="flex gap-4 flex-col md:flex-row items-center">
          {movie1Details && <MovieCard movie={movie1Details} />}
          <h1 className="text-4xl font-bold text-primary">and</h1>
          {movie2Details && <MovieCard movie={movie2Details} />}
        </div>
        <h1 className="text-4xl font-bold text-primary">is...</h1>
        {currentMovie !== null && relatedMovies.length > 0 && (
          <>
            <MovieCard movie={relatedMovies[currentMovie]} />
            <button
              className="bg-accent text-white px-4 py-2 rounded-lg user-select-none"
              onClick={() => {
                const newMovies = [...relatedMovies];
                newMovies.splice(currentMovie, 1);
                if (newMovies.length === 0) return setPage(page + 1);
                setRelatedMovies(newMovies);
                setCurrentMovie(Math.floor(Math.random() * newMovies.length));
              }}
            >
              Show me another one
            </button>
          </>
        )}
        {fullyLoaded && (
          <h1 className="text-3xl font-bold text-primary">
            No (more) similar movies found
          </h1>
        )}
      </div>
    </Page>
  );
}
