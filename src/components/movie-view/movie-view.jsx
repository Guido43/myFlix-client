import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import { useParams } from "react-router";
import "./movie-view.scss";


export const MovieView = ({ movies, setUser, user, token }) => {
  //console.log("userParams is", useParams());
  const {movieview: movieId} = useParams();
  
  console.log("user is", user);
  const [isFavorite, setIsFavorite] = useState(user.favoritemovies.includes(movieId));

  //useEffect(() => {
    //const isFavoriteMovie = user.favoritemovies.includes(movie._id)
    //setIsFavorite(isFavoriteMovie)
  //}, []);

  
  const addFavoriteMovie = () => {
    fetch(`https://guysflix-d8285acb1f18.herokuapp.com/users/${user.Username}/movies/${movie._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    }).then((response) => {
      if (response.ok) {
        return response.json();
      } else {alert ('Failed');
        return false;
      }
    }).then((user) => {
      if (user) {
        alert('Movie added to favorites');
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      setIsFavorite(true);
      }
    })
  };


  const removeFavoriteMovie = () => {
    fetch(`https://guysflix-d8285acb1f18.herokuapp.com/users/${user.Username}/movies/${movie._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    }).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        alert('Failed');
        return false;
      }
    })
      .then((user) => {
        if (user) {
          alert('Movie deleted from favorites');
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      setIsFavorite(false);
        }
    })
    .catch((e) => {
      alert(e);
    });
  };


  console.log("movies is", movies);
  console.log("movieId is", movieId);
  const movie = movies.find((m) => m._id === movieId)
  console.log(movie);
  console.log(setIsFavorite);
  
  return (
    <div>
      <div>
        <span>Title: </span>
        <span>{movie.Title}</span>
      </div>
      <div>
        <span>Image: </span>
        <img src={movie.imagePath}>
          </img>
      </div>
      <div>
        <span>Description</span>
        <span>{movie.Description}</span>
        </div>
      <div>
        <span>Director: </span>
        <span>{movie.Director.Name}</span>
      </div>
      <div>
          <span>Genre: </span>
          <span>{movie.Genre.Name}</span>
      </div>

      {isFavorite ? (
                <Button onClick={removeFavoriteMovie}>Remove from favorites</Button>
            ) : (
                <Button onClick={addFavoriteMovie}>Add to favorites</Button>
            )}



      <Link to={"/"}>
      <button  type="link" className="back-button" style={{cursor: "pointer"}}>Back</button>
      </Link>
    </div>
  );
};
MovieView.PropTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired
    }),
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired
    }).isRequired,
    //onBackClick: PropTypes.func.isRequired
  })
}