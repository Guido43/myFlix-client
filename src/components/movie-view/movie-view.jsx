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
      <button onClick={onBackClick}>Back</button>
    </div>
  );
};
MovieView.PropTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isrequired
    }),
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired
    }).isRequired,
    onBackClick: PropTypes.func.isRequired
  })
}