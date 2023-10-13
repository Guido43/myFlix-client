import { useState } from "react";
import { React } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import './login-view.scss';


export const LoginView = ({ onLoggedIn }) => {
       const [username, setUsername] = useState('');
       const [password, setPassword] = useState('');

       const handleSubmit = (event) => {
        event.preventDefault();

       const data = {
          Username: username,
          Password: password
        };
                    
      fetch("https://guysflix-d8285acb1f18.herokuapp.com/login",
      {method: "POST",
      headers: {"content-type":"application/json"
    },
       body:JSON.stringify(data)
      }).then ((response) => response.json())
      .then ((data) => {
        console.log("login response:", data);
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
          onLoggedIn (data.user, data.token);
        } else
      {alert("no such user");
    }
  })
  .catch((e) => {alert("something went wrong");
});
}


    return (
    
    
      <Form onSubmit = {handleSubmit}>
        <Form.Group className="form-header" controlId="formUserName">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            requiredminlength="3"/>
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
      </Form>
    
    
    );
  };