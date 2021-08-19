import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import LoginForm from "./components/loginForm";
import SignupForm from "./components/signupForm";
import AllThreads from "./components/allThreads";
import OneThread from "./components/oneThread";
import "./stylesheets/reset.css";
import "./stylesheets/utility.css";
import "./stylesheets/main.css";
import "./stylesheets/submitForm.css";

import Cookies from "universal-cookie";
const cookies = new Cookies();

function App() {
  const [jwttoken, setJwttoken] = useState(cookies.get("token"));

  return (
    <div class="main roundBorder mediumBlue marginMiddle topMargin">
      <Router>
        <nav class="roundBorder flexRow topMargin lightWhite">
          <div>
            <Link to="/"> Board Index </Link>
          </div>
          <div class="flexChange"></div>
          <div>
            <img
              src="https://i.ibb.co/Y0FGSVL/modify.png"
              alt="modify"
              border="0"
            ></img>
            <Link to="/signup"> Register </Link>
          </div>
          <div class="leftMargin">
            <img
              src="https://i.ibb.co/44mwbdv/power-off-line.png"
              alt="power-off-line"
              border="0"
            ></img>
            <Link to="/login"> Login </Link>
          </div>
        </nav>
        <Switch>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/signup">
            <SignUpPage />
          </Route>
          <Route path="/thread/:id">
            <Thread />
          </Route>
          <Route path="/">
            <MainPage />
          </Route>
        </Switch>
      </Router>
    </div>
  );

  function LoginPage() {
    return <LoginForm onChangeToken={setJwttoken} />;
  }

  function SignUpPage() {
    return <SignupForm />;
  }

  function Thread() {
    return <OneThread token={jwttoken} />;
  }

  function MainPage() {
    return <AllThreads token={jwttoken} />;
  }
}

export default App;
