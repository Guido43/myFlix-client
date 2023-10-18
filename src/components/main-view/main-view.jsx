import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { ProfileView } from "../profile-view/profile-view";
import { SearchForm } from "../search-form/search-form";
import { useEffect } from "react";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PropTypes from 'prop-types'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './main-view.scss'


export const MainView = () => {

  const storedUser = JSON.parse(localStorage.getItem('user'));
  const storedToken = localStorage.getItem('token');
  const [user, setUser] = useState(storedUser? storedUser: null);
  const [token, setToken] = useState(storedToken? storedToken: null);
  const [movies, setMovies] = useState([]);
  
  
  
  //const [selectedMovie, setSelectedMovie] = useState(null);
  const onLogout = () => {
        setUser(null);
        setToken(null);
        localStorage.clear();
  }

  //filtering movies in search bar
  const handleSearch = (searchName) => {
  const filteredMovies = movies.filter((movie) =>
        movie.Title.toLowerCase().includes(searchName.toLowerCase())
        );
        setMovies(filteredMovies);
  };


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
            _id: movie._id,
            Title: movie.Title,
            imagePath: movie.imagePath,
            Description: movie.Description,
            Director: {Name: movie.Director.Name},
            Genre: {Name: movie.Genre.Name,
                    Description: movie.Genre.Description},
            Actors: movie.Actors,
          };
        });
        setMovies(moviesFromApi);
        
      });
  }, [token]);

  console.log("user is", user)

  return (
    <BrowserRouter>
      <NavigationBar
         user = {user}
         onLoggedOut={() => {
         setUser (null);
         setToken (null);
         localStorage.clear();
      }}
      />
    <Row className="cards-container">
      <Routes>
        
        
        
        
        
        
        <Route
        path="/signup"
        element={
        <>
          {user ? (
          <Navigate to="/" />
                      ) : (
                          <Col md={5}>
                            <SignupView />
                          </Col>
                      )}
                      </>
                      }
                      />
        
        
        
        
        
        <Route 
          path="/login"
          element={
            <>
            {user ? (
            <Navigate to="/" />
                        ) : (
                            <Col md={5}>
                                <LoginView onLoggedIn={(user, token) => {
                                    setUser(user);
                                    setToken(token);
                                }} />
                            </Col>
                        )}
                      </>
                    }
                    />
          



          <Route path="/"
              element={
                <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>This list is Empty!</Col>
                ) : (
                  <>
                  <Row>
                    <Col>
                            <SearchForm onSearch={handleSearch} />
                    </Col>
                  </Row>
                  {movies.map((movie) => (
                    <Col className="mb-3" key={movie.Title} md={4}>
                    <MovieCard movie={movie} 
                              user={user} 
                              token={token} 
                              setuser={setUser} />
                    </Col>
                  ))}

                  <button
                      variant="secondary"
                      onClick={onLogout}
                      >LogOut</button>
                  </>
                )}
                </>
              }
              />



              <Route path="/profile"
                    element={
                        <>
                        {!user ? (
                            <Navigate to="/login" replace />
                        ) : (
                            <Col>
                                <ProfileView 
                                user={user}
                                token={token}
                                setUser={setUser}
                                movies={movies}
                                onLogout={onLogout}
                                />
                            </Col>
                        )}</>
                    }
                    />
          
          
          
          
          <Route
           path= "/movies/:movieview"
           element={
            <>
            {!user ? (
              <Navigate to="/login" replace />
            ) : movies.length === 0 ? (
              <Col>The list is empty!</Col>
            ) : (
              <Col >
                <MovieView
                  movies={movies}
                  user={user}
                  token={token}
                  setUser={setUser}
                  />
                  </Col>
           )}
              </>
           }
          /> 
   
        </Routes>
        </Row>
      </BrowserRouter>
  );
          };


            
