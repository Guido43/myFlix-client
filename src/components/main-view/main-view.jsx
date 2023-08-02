import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "Silence of the Lambs",
      image:
        "https://www.alamy.com/the-silence-of-the-lambs-a-1991-american-thriller-film-starring-jodie-image69821205.html",
      director: "Jonathan Demme"
    },
    {
      id: 2,
      title: "Robin Hood, Prince of thieves",
      image:
        "https://www.alamy.com/kevin-costner-robin-hood-prince-of-thieves-1991-image475152713.html",
      director: "Kevin Reynolds"
    },
    {
      id: 3,
      title: "The Mask",
      image:"https://favpng.com/png_view/rap-stanley-ipkiss-film-the-mask-actor-new-line-cinema-png/xhaCfBmL",
      director: "Charles Russell"
    },
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};