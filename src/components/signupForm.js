import React, { useState } from "react";

const SignupForm = function SignupForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function submitForm() {
    fetch(process.env.REACT_APP_API_LOCATION + "/user/signup", {
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
      .then((data) => {
        console.log("Success:", data);
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
            <h2> Signup </h2>
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

export default SignupForm;
