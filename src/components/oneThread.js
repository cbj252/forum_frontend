import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { createPost } from "../helpFunc";

const OneThread = function OneThread(props) {
  const [content, setContent] = useState("");
  let { id } = useParams();

  useEffect(() => {
    const postArea = document.getElementById("postArea");
    function deleteLink(postId) {
      const link = document.createElement("p");
      link.className = "smallText";
      link.innerHTML = "Delete";
      link.addEventListener("click", () => {
        fetch(
          process.env.REACT_APP_API_LOCATION + `/threads/${postId}/delete`,
          {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
              authorization: "Bearer " + props.token,
            },
          }
        )
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            window.location.reload();
          })
          .catch((error) => {
            return "Error" + error;
          });
      });
      console.log(link);
      return link;
    }

    function getPosts() {
      if (!props.token) {
        postArea.innerHTML = "Not logged in.";
      }
      fetch(process.env.REACT_APP_API_LOCATION + "/threads/" + id, {
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
              const postDiv = document.createElement("li");
              postDiv.key = element._id;
              postDiv.classList = "roundBorder lightWhite flexRow";
              postDiv.appendChild(
                createPost(
                  element.thread.title,
                  element.author.username,
                  element.content,
                  element.time
                )
              );
              postDiv.appendChild(deleteLink(element._id));
              postArea.appendChild(postDiv);
            });
          }
        })
        .catch((error) => {
          return "Error" + error;
        });
    }
    getPosts();
  }, [props.token, props.userType, id]);

  function postNewPost(e) {
    e.preventDefault();
    if (!props.token) {
      return "Not logged in.";
    }
    fetch(process.env.REACT_APP_API_LOCATION + "/threads/" + id, {
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
      <div className="roundBorder lightWhite topMargin flexRow">
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
