import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { createThread } from "../helpFunc";

const AllThreads = function AllThreads(props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    const threadArea = document.getElementById("threadArea");
    const makeThreadArea = document.getElementById("makeThreadArea");
    function getThreads() {
      if (!props.token) {
        threadArea.innerHTML = "Not logged in.";
        makeThreadArea.innerHTML = "";
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
          threadArea.innerHTML = "";
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
      .then(async (threadId) => {
        window.location.href = `/thread/${threadId}`;
        fetch(process.env.REACT_APP_API_LOCATION + "/threads/" + threadId, {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + props.token,
          },
          body: JSON.stringify({
            content: content,
          }),
        });
      })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success making post", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return (
    <div>
      <Router>
        <div className="main topMargin marginMiddle">
          <ul id="threadArea">
            <p> Loading threads, please wait. </p>
          </ul>
        </div>
      </Router>
      <form
        id="makeThreadArea"
        className="topMargin"
        onSubmit={(e) => postNewThread(e)}
      >
        <label> Make New Thread </label>
        <div className="topMargin">
          <label htmlFor="title"> Thread Title: </label>
          <input
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></input>
        </div>
        <div className="topMargin">
          <label htmlFor="content"> New post content: </label>
          <textarea
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="bigInputBox"
          ></textarea>
        </div>
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
