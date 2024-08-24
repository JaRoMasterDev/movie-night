import { Movie } from "@/lib/types/movie";
import Image from "next/image";
import { DetailedMovie } from "@/lib/types/detailed-movie";

export interface MovieCardProps {
  movie?: Movie | DetailedMovie | null;
  onClick?: (e: any) => void;
  imageWidth?: number;
}

export default function MovieCard(props: MovieCardProps) {
  return (
    <div
      className={
        "flex flex-col gap-4 items-center py-4 rounded-xl bg-primary w-64 mx-auto " +
        (props.onClick
          ? "hover:cursor-pointer hover:bg-accent hover:scale-105 transition-all duration-200"
          : "")
      }
      onClick={props.onClick}
    >
      {props.movie && (
        <Image
          src={"https://image.tmdb.org/t/p/w200" + props.movie.poster_path}
          alt={props.movie.title}
          width={props.imageWidth || 200}
          height={props.imageWidth ? 1.5 * props.imageWidth : 300}
        />
      )}
      <h1 className="text-text-dark text-xl font-semibold w-[200px] text-center">
        {props.movie?.title}
      </h1>
    </div>
  );
}
