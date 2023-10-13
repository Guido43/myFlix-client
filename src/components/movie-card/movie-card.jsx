import { useState } from "react";
import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./movie-card.scss";


export const MovieCard = ({ movie, user, setUser, token, imagePath }) => {
  return (
    <Card className="h-100">
      <Card.Img variant="top" className="movie-image" src={movie.imagePath} />
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>{movie.Description}</Card.Text>

        <Link to={`/movies/${encodeURIComponent(movie._id)}`} state={{ user: user }}>
        <Button variant="link">more information</Button>
        </Link>
      </Card.Body>
      </Card>
    
    
  );
};
MovieCard.PropTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    imagePath: PropTypes.string.isRequired,
  }).isRequired,
  
};