import MovieSelector from "@/app/movie-selector";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-6xl font-bold text-primary">Movie Match</h1>
      <p className="text-lg">
        Don&apos;t know what to watch with your partner/friend?
      </p>
      <MovieSelector />
    </div>
  );
}
