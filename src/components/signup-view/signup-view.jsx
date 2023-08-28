import { useState } from "react";
import { React } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";


export const SignupView = ({ onSignedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleSubmit = (event) => {
      event.preventDefault();

      const data = {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday
      };

    fetch("https://guysflix-d8285acb1f18.herokuapp.com/users", {
      method: "POST",
      headers: {"content-type":"application/json"},
      body:JSON.stringify(data)


      }).then ((response) => {
        if (response.ok){
          alert("Signup Successful");
          window.location.reload();
          } 
          else {
            alert ("signup failed!");
        }
      })
      .catch((e) => {alert("something went wrong");
});
  }
    
      return (
      <Form onSubmit = {handleSubmit}>
        <Form.Group controlId="formUserName">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            requiredminLength="3"/>
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required />
          </Form.Group>
          
        <Form.Group controlId="formEmail">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            requiredminLength="3"/>
      </Form.Group>

      <Form.Group controlId="formBirthday">
        <Form.Label>Date of Birth</Form.Label>
        <Form.Control
          type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          required />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
    </Form>   
      );
    };
  