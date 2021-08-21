import React, { useState } from "react";

import Cookies from "universal-cookie";
const cookies = new Cookies();

const LoginForm = function LoginForm(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function submitForm() {
    fetch(process.env.REACT_APP_API_LOCATION + "/user/login", {
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
        props.onChangeToken(response.token);
        cookies.set("token", response.token, { path: "/" });
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
