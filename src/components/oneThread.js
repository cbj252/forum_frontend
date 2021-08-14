import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const OneThread = function OneThread(props) {
  const [content, setContent] = useState("");
  let { id } = useParams();
  console.log(props);

  useEffect(() => {
    const postArea = document.getElementById("postArea");
    function getPosts() {
      if (!props.token) {
        postArea.innerHTML = "Not logged in.";
      }
      fetch("http://localhost:8000/threads/" + id, {
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
            dummyNode.innerHTML = element.content;
            dummyNode.href = "/thread/" + element._id;
            dummyPart.appendChild(dummyNode);
            postArea.appendChild(dummyPart);
          });
        })
        .catch((error) => {
          return "Error" + error;
        });
    }
    getPosts();
  }, [props.token, id]);

  function postNewPost(e) {
    e.preventDefault();
    if (!props.token) {
      return "Not logged in.";
    }
    fetch("http://localhost:8000/threads/" + id, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + props.token,
      },
      body: JSON.stringify({
        content: content,
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
      <div className="darkBlue mainBox topMargin marginMiddle">
        <p> Topics </p>
        <ul id="postArea"></ul>
      </div>
      <form onSubmit={(e) => postNewPost(e)}>
        <label htmlFor="content"> New post content: </label>
        <input
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></input>
      </form>
      <button onClick={() => postNewPost()}> Post </button>
    </div>
  );
};

export default OneThread;
