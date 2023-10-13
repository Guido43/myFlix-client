import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Modal from "react-bootstrap/Modal";
import { MovieCard } from "../movie-card/movie-card";
import { Modal } from "react-bootstrap";
import "./profile-view.scss"

export const ProfileView = ({ user, token, setUser, movies, onLogout }) => {
    const [username, setUsername] = useState(user.Username);
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState(user.Email);
    const [birthday, setBirthday] = useState(user.Birthday);
    const [showModal, setShowModal] = useState(false);
    //const favoriteMovies = movies.filter((movie) => {
      //  return user.favoriteMovies.includes(movie.id)
    //});
    console.log("user is", user);
    const favourite_movies = movies.filter((movie) => { 
        return user.favoritemovies.includes(movie._id)
    });
    

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            Username: username,
            Email: email,
            Birthday: birthday
        };
        if(password) {
            data['Password'] = password
        }

        fetch(`https://guysflix-d8285acb1f18.herokuapp.com/users/${user.Username}`, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            if (response.ok) {
                return response.json()
            } else {
                alert("Update failed.")
            }
        }).then((data) => {
            localStorage.setItem("user", JSON.stringify(data));
            setUser(data);
            alert("Your details have been updated")
        })
    };

    const handleDeleteUser = () => {
        fetch(`https://guysflix-d8285acb1f18.herokuapp.com/users/${user.Username}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            if (response.ok) {
                onLogout();
                alert("You have been deleted from the app, please log out");
            } else {
                alert("something went wrong.")
            }
        })
    }

    return (
        <>
        <h1>Profile</h1>
        <Row>
            <Col>
                <div>Username: {user.Username}</div>
                <div>Email: {user.Email}</div>
            </Col>
        </Row>
        <Row>
            <h2>Update your profile information here.</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="profile-update" controlId="formUsername">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        minLength="5" 
                    />
                </Form.Group>
                <Form.Group controlId="formPassword">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength="5"
                    />
                </Form.Group>
                <Form.Group controlId="formEmail">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formBirthday">
                    <Form.Label>Birthday:</Form.Label>
                    <Form.Control
                        type="date"
                        value={birthday}
                        onChange={(e) => setBirthday(e.target.value)}
                        required
                    />
                </Form.Group>
                <Button variant="primary" type="submit">Save changes</Button>
            </Form>
        </Row>
        <Row>
            <h2>Favorite movies:</h2>
            {favourite_movies.map((movie) => (
                <Col className="mb-5" key={movie._id} md={4}>
                    <MovieCard movie={movie}
                               user={user}
                               token={token}
                               setUser={setUser}>

                    </MovieCard>
                </Col>
            ))}
        </Row>
        <Button variant="primary" onClick={handleShowModal}>
            Delete my account
        </Button>
        <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>Delete account</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete your account?</Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleDeleteUser}>Yes</Button>
                <Button variant="secondary" onClick={handleCloseModal}>No</Button>
            </Modal.Footer>
        </Modal>
        </>
    )
}