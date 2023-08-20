import { useState } from "react";
import { React } from "react";


export const LoginView = ({ onLoggedIn }) => {
       const [username, setUsername] = useState("");
       const [password, setPassword] = useState("");

       const handleSubmit = (event) => {
        event.preventDefault();

       const data = {
          Username: username,
          Password: password
        };
                    
      fetch("https://guysflix-d8285acb1f18.herokuapp.com/users/login",
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
      <form onSubmit = {handleSubmit}>
        <label>
          Username:
          <input type="text" 
           value={username} 
           onChange={(e) => setUsername(e.target.value)} required />
        </label>
        <label>
          Password:
          <input type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <button type="submit">Submit</button>
      </form>
    );
  };