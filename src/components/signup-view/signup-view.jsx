import { useState } from "react";
import { React } from "react";

export const SignupView = ({ onSignedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleSubmit = (event) => {
      event.preventDefault();

      const data = {
        username: username,
        password: password,
        email: email,
        birthday: birthday
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
        <form onSubmit={handleSubmit}>
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              minLength="3"
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            Birthday:
            <input
              type="date"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              required
            />
          </label>
          <button type="submit">Submit</button>
        </form>
      );
    };
  