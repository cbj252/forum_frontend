import React, { useState } from "react";

const LoginForm = function LoginForm(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function submitForm() {
    fetch("http://localhost:8000/user/login", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        props.onChangeToken(response.token);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return (
    <div className="topMargin orange">
      <div className="centerSquare">
        <form>
          <div className="flexColumn">
            <h2> Login </h2>
            <label className="topMargin" htmlFor="username">
              Username
            </label>
            <input
              className="topMargin"
              name="username"
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              required
            />
            <label className="topMargin" htmlFor="password">
              Password
            </label>
            <input
              className="topMargin"
              name="password"
              type="text"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>
        </form>
        <button className="topMargin" onClick={() => submitForm()}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default LoginForm;