"use client";
import { useEffect, useRef, useState } from "react";
import { Movie } from "@/lib/types/movie";
import { fetchPopularMovies } from "@/lib/api/popular-movies";
import { searchMovies } from "@/lib/api/movie-search";
import MovieCard from "@/components/movie-card";
import Link from "next/link";

export default function MovieSelector() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [search, setSearch] = useState("");
  const [selectedMovie1, setSelectedMovie1] = useState<Movie | null>(null);
  const [selectedMovie2, setSelectedMovie2] = useState<Movie | null>(null);
  const prevSearch = useRef("");

  useEffect(() => {
    fetchPopularMovies().then((response) => setMovies(response.results));
  }, []);

  useEffect(() => {
    const prev = prevSearch.current;
    const t = setTimeout(async () => {
      console.log(search, prev);
      if (search === "" && prev !== "") {
        const response = await fetchPopularMovies();
        setMovies(response.results);
        return;
      }
      if (search === prev) return;

      const response = await searchMovies(search);
      setMovies(response.results);
    }, 500);
    prevSearch.current = search;
    return () => clearTimeout(t);
  }, [search]);

  const selectMovie = (movie: Movie) => {
    if (!selectedMovie1) {
      setSelectedMovie1(movie);
    } else if (!selectedMovie2) {
      setSelectedMovie2(movie);
    } else {
      setSelectedMovie1(movie);
      setSelectedMovie2(null);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl font-bold mt-8">Select two movies!</h1>
      {selectedMovie1 && (
        <div className="flex flex-col items-center mt-4">
          <div className="flex flex-col md:flex-row gap-4 min-h-96">
            <MovieCard movie={selectedMovie1} />
            <MovieCard movie={selectedMovie2} />
          </div>
          <Link
            className={
              "py-3 px-6 rounded-md text-xl mt-4 text-white" +
              (selectedMovie2
                ? " hover:scale-105 transition-all bg-accent cursor-pointer"
                : " bg-gray-600 cursor-not-allowed pointer-events-none")
            }
            href={"/match/" + selectedMovie1.id + "/" + selectedMovie2?.id}
          >
            {selectedMovie1 && selectedMovie2
              ? "Match!"
              : "Select two movies to match!"}
          </Link>
        </div>
      )}
      <hr className="border-t-2 border-gray-200 w-full mt-4 mb-8" />

      <input
        className="border-2 border-accent p-2 rounded-md text-gray-950 mb-8 w-1/2"
        type="text"
        placeholder="Search for a movie"
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="grid grid-cols-1s md:grid-cols-2 lg:grid-cols-3 gap-8 w-full my-8">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onClick={() => selectMovie(movie)}
          />
        ))}
      </div>
    </div>
  );
}
