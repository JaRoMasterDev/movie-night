import Page from "@/components/page";
import Link from "next/link";

export default function AboutPage() {
  return (
    <Page>
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-4xl font-bold">About</h1>
        <p className="text-lg">
          {" "}
          Movie Match is a web app that helps you find the perfect movie to
          watch with your friends or family. <br /> You can compare two movies
          and get a list of similar movies based on several aspects of the
          movies you choose. <br /> The app uses the TMDb API to fetch movie
          data and provide you with the best movie recommendations.
        </p>
        <p className="text-lg">
          I -{" "}
          <Link
            href="https://www.jarne-rolf.de"
            className="text-accent underline"
          >
            Jarne Rolf
          </Link>{" "}
          - have developed Movie Match as a side project in order to improve my
          skills for working with APIs and Next.js
        </p>
      </div>
    </Page>
  );
}
