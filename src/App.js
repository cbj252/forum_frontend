import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import LoginForm from "./components/loginForm";
import SignupForm from "./components/signupForm";
import AllThreads from "./components/allThreads";
import OneThread from "./components/oneThread";
import "./stylesheets/reset.css";
import "./stylesheets/utility.css";
import "./stylesheets/submitForm.css";

function App() {
  const [jwttoken, setJwttoken] = useState("");

  return (
    <div>
      <Router>
        <nav className="flexRow topMargin flexCrossCenter">
          <h1 className="leftMargin"> Tasktopia </h1>
          <div className="flexChange"></div>
          <Link to="/">
            <p className="flexSelfEnd rightMargin"> Main Page </p>
          </Link>
          <Link to="/signup">
            <p className="flexSelfEnd rightMargin"> Signup </p>
          </Link>
          <Link to="/login">
            <p className="flexSelfEnd rightMargin"> Login </p>
          </Link>
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
