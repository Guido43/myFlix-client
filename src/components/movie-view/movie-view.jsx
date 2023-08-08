import PropTypes from "prop-types";

export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div>
      <div>
        <img src={movie.image} />
      </div>
      <div>
        <span>Title: </span>
        <span>{movie.Title}</span>
      </div>
      <div>
        <span>Image: </span>
        <span>{movie.ImagePath}</span>
      </div>
        <span>Description: </span>
        <span>{movie.Description}</span>
      <div>
        <span>Director: </span>
        <span>{movie.Director.Name}</span>
      </div>
      <div>
        <span>Genre: </span>
        <span>{movie.Genre.Name}</span>
      </div>
      
      <button onClick={onBackClick}>Back</button>
    </div>
  );
};
MovieView.propTypes = {
  movie: PropTypes.shape({
    ImagePath: PropTypes.string,
    Title: PropTypes.string,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({Name: PropTypes.string}),
    Director: PropTypes.shape({Name: PropTypes.string}), 
    onBackClick: PropTypes.func
  }),
}