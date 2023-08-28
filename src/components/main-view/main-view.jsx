import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { useEffect } from "react";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PropTypes from 'prop-types'


export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser? storedUser: null);
  const [token, setToken] = useState(storedToken? storedToken: null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    if (!token) 
      return;
    
    fetch("https://guysflix-d8285acb1f18.herokuapp.com/movies", {
      headers: {Authorization: `Bearer ${token}` } 
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        const moviesFromApi = data.map((movie) => {
          return {
            _id: movie.id,
            Title: movie.Title,
            imagePath: movie.imagePath,
            Description: movie.Description,
            Director: {Name: movie.Director.Name},
            Genre: {Name: movie.Genre.Name},
          };
        });
        setMovies(moviesFromApi);
      });
  }, [token]);

  
  return (
    <Row className="justify-content-md-center">
      {!user ? (
      
        <Col md={5}>
    <LoginView 
              onLoggedIn = {(user, token) => {
                setUser(user);
                setToken(token);
              }} 
            />
            or
            
            <SignupView /></Col>
          
          ) : selectedMovie ? (
            <Col md={8} style={{border: "1px black solid"}}>
              <MovieView
              movie={selectedMovie}
              onBackClick={() => setSelectedMovie(null)}
              /></Col>
          ) : movies.length === 0 ? (
            <div>The list is Empty</div>
          ) : (
            <> 
            {movies.map((movie) => (
              <Col className="mb-5" key={movie.id} md={3}>

        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }} />
          </Col>
            ))} 
    <button className="w-50"
      onClick={() => {
        setUser(null);
        setToken(null);
        localStorage.clear();
      }}
    >
      Logout
    </button>
          </>
        )}
      </Row>
  );
    };
        
        
      

  //if (selectedMovie) {
    //return (
      //<div>
     //<button
      //onClick={() => {
        //setUser(null);
        //setToken(null);
        //localStorage.clear();
      //}}
    //>
      //Logout
    //</button>
      //<MovieView
        //movie={selectedMovie}
        //onBackClick={() => setSelectedMovie(null)}
      //>
      //</div>
    //);
  //}
  
  //if (movies.length === 0) {
    //return (
      //<>
        //<button
          //onClick={() => {
            //setUser(null);
            //setToken(null);
            //localStorage.clear();
          //}}
        //>
          //Logout
        //</button>
        //<div>The list is empty!</div>
      //</>
    //);
  //}

  //return (
    //<div>
      //<button
        //onClick={() => {
          //setUser(null);
          //setToken(null);
          //localStorage.clear();
        //}}
     // >
       // Logout
      //</button>
      //{movies.map((movie) => (
        //<MovieCard
          //key={movie.id}
         // movie={movie}
          //onMovieClick={(newSelectedMovie) => {
            //setSelectedMovie(newSelectedMovie);
          //}}
        //>
      //))}
    //</div>
  //);
//};
