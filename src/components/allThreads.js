import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { createThread } from "../helpFunc";

const AllThreads = function AllThreads(props) {
  const [title, setTitle] = useState("");

  useEffect(() => {
    const threadArea = document.getElementById("threadArea");
    function getThreads() {
      if (!props.token) {
        threadArea.innerHTML = "Not logged in.";
      }
      fetch(process.env.REACT_APP_API_LOCATION + "/threads", {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + props.token,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          data.forEach((element) => {
            threadArea.appendChild(createThread(element._id, element.title));
          });
        })
        .catch((error) => {
          return "Error" + error;
        });
    }
    getThreads();
  }, [props.token]);

  function postNewThread(e) {
    e.preventDefault();
    if (!props.token) {
      return "Not logged in.";
    }
    fetch(process.env.REACT_APP_API_LOCATION + "/threads", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + props.token,
      },
      body: JSON.stringify({
        title: title,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return (
    <div>
      <Router>
        <div className="darkBlue mainBox topMargin marginMiddle">
          <ul id="threadArea"></ul>
        </div>
      </Router>
      <form onSubmit={(e) => postNewThread(e)}>
        <label htmlFor="title"> Thread Title: </label>
        <input
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></input>
        <button type="submit">
          <img
            src="https://i.ibb.co/tYdNk0J/feather.png"
            alt="feather"
            border="0"
          ></img>
          Submit
        </button>
      </form>
    </div>
  );
};

export default AllThreads;
