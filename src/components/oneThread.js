import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function createPost(threadTitle, username, postContent, time) {
  const mainDiv = document.createElement("div");
  mainDiv.classList = "leftMargin flexChange";

  const title = document.createElement("a");
  title.innerHTML = threadTitle;
  title.href = "/";

  const timestamp = document.createElement("p");
  timestamp.className = "smallText";
  timestamp.innerHTML = `by ${username} >> ${new Date(time)}`;

  const content = document.createElement("p");
  content.className = "topMargin";
  content.innerHTML = postContent;

  mainDiv.appendChild(title);
  mainDiv.appendChild(timestamp);
  mainDiv.appendChild(content);
  return mainDiv;
}

const OneThread = function OneThread(props) {
  const [content, setContent] = useState("");
  let { id } = useParams();

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
          if (data.length === 0) {
            const message = document.createElement("p");
            message.innerHTML = "No posts in this thread. Make a post now!";
            postArea.appendChild(message);
          } else {
            data.forEach((element) => {
              const dummyPart = document.createElement("li");
              dummyPart.key = element._id;
              dummyPart.classList = "roundBorder lightWhite flexRow";
              dummyPart.appendChild(
                createPost(
                  element.thread.title,
                  element.author.username,
                  element.content,
                  element.time
                )
              );
              postArea.appendChild(dummyPart);
            });
          }
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
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return (
    <div>
      <div class="roundBorder lightWhite topMargin flexRow">
        <ul id="postArea"></ul>
      </div>
      <form onSubmit={(e) => postNewPost(e)}>
        <label htmlFor="content"> New post content: </label>
        <input
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
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

export default OneThread;
