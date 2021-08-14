import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";

const AllThreads = function AllThreads(props) {
  const [title, setTitle] = useState("");

  useEffect(() => {
    const threadArea = document.getElementById("threadArea");
    function getThreads() {
      if (!props.token) {
        threadArea.innerHTML = "Not logged in.";
      }
      fetch("http://localhost:8000/threads", {
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
            const dummyPart = document.createElement("li");
            const dummyNode = document.createElement("a");
            dummyNode.key = element._id;
            dummyNode.innerHTML = element.title;
            dummyNode.href = "/thread/" + element._id;
            dummyPart.appendChild(dummyNode);
            threadArea.appendChild(dummyPart);
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
    fetch("http://localhost:8000/threads", {
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
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return (
    <div>
      <Router>
        <div className="darkBlue mainBox topMargin marginMiddle">
          <p> Posts </p>
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
        <button type="submit"> Submit </button>
      </form>
    </div>
  );
};

export default AllThreads;
