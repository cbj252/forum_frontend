import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import LoginForm from "./components/loginForm";
import SignupForm from "./components/signupForm";
import AllThreads from "./components/allThreads";
import OneThread from "./components/oneThread";
import AdminPage from "./components/adminPage";
import "./stylesheets/reset.css";
import "./stylesheets/utility.css";
import "./stylesheets/main.css";
import "./stylesheets/submitForm.css";

import Cookies from "universal-cookie";
const cookies = new Cookies();

function App() {
  const [jwttoken, setJwttoken] = useState(cookies.get("token"));
  const [username, setUsername] = useState("");
  const [userType, setUserType] = useState("");

  useEffect(() => {
    function getState() {
      fetch(process.env.REACT_APP_API_LOCATION + "/user/current", {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + jwttoken,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data !== "User not found") {
            setUsername(data.username);
            setUserType(data.type);
          }
        })
        .catch((error) => {
          return "Error" + error;
        });
    }
    getState();
  });

  function makeNavbar() {
    if (username === "") {
      return (
        <nav className="roundBorder flexRow flexCrossCenter topMargin lightWhite">
          <div>
            <Link to="/"> Board Index </Link>
          </div>
          <div className="flexChange"></div>
          <div className="leftMargin">
            <img
              src="https://i.ibb.co/Y0FGSVL/modify.png"
              alt="modify"
              border="0"
            ></img>
            <Link to="/signup"> Register </Link>
          </div>
          <div className="leftMargin">
            <img
              src="https://i.ibb.co/44mwbdv/power-off-line.png"
              alt="power-off-line"
              border="0"
            ></img>
            <Link to="/login"> Login </Link>
          </div>
        </nav>
      );
    } else if (userType === "user") {
      return (
        <nav className="roundBorder flexRow flexCrossCenter topMargin lightWhite">
          <div>
            <Link to="/"> Board Index </Link>
          </div>
          <div className="flexChange"></div>
          <div className="leftMargin">
            <p> Welcome back, {username} </p>
          </div>
          <div className="leftMargin">
            <img
              src="https://i.ibb.co/44mwbdv/power-off-line.png"
              alt="power-off-line"
              border="0"
            ></img>
            <Link to="/login"> Login </Link>
          </div>
        </nav>
      );
    } else {
      return (
        <nav className="roundBorder flexRow flexCrossCenter topMargin lightWhite">
          <div>
            <Link to="/"> Board Index </Link>
          </div>
          <div className="flexChange"></div>
          <Link to="/admin"> Admin Portal </Link>
          <div className="leftMargin">
            <p> Welcome back, {username} </p>
          </div>
          <div className="leftMargin">
            <img
              src="https://i.ibb.co/44mwbdv/power-off-line.png"
              alt="power-off-line"
              border="0"
            ></img>
            <Link to="/login"> Login </Link>
          </div>
        </nav>
      );
    }
  }

  return (
    <div className="main roundBorder mediumBlue marginMiddle topMargin">
      <Router>
        {makeNavbar()}
        <Switch>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/signup">
            <SignUpPage />
          </Route>
          <Route path="/admin">
            <AdminCenter />
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
    return <OneThread token={jwttoken} userType={userType} />;
  }

  function MainPage() {
    return <AllThreads token={jwttoken} />;
  }

  function AdminCenter() {
    return <AdminPage token={jwttoken} />;
  }
}

export default App;
