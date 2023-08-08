import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
<<<<<<< Updated upstream
import { useState } from "react";
=======
import { useEffect } from "react";
>>>>>>> Stashed changes

export const MainView = () => {
  const [movies, setMovies] = useState([]);

  const [selectedMovie, setSelectedMovie] = useState(null);
  useEffect(() => {
    fetch("https://guysflix-d8285acb1f18.herokuapp.com/movies")
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.docs.map((doc) => {
          return {
            id: doc.key,
            title: doc.title,
<<<<<<< Updated upstream
            image: `https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg`,
            director: doc.director_name?.[0]
          };
        });
        setMovies(moviesFromApi);
      });
  }, []);
=======
            image: "https://www.alamy.com/stock-photo-the-mask-1994-entertainmentnew-line-film-with-jim-carrey-28304904.html?imageid=9707B241-9983-443A-B1BF-4DD663E5983D&p=13044&pn=1&searchId=57bc1de0872727742c879d76d51c047a&searchtype=0",
            director: doc.author_name?.[0]
          };
        });

        setMovies(moviesFromApi);
      });
  }, []);

>>>>>>> Stashed changes

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