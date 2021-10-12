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
      link.classList = "smallText blueLink";
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
      return link;
    }

    function editLink(postId, postContent) {
      const hideEditPanel = document.createElement("div");
      hideEditPanel.style.display = "none";
      hideEditPanel.classList = "flexColumn";

      const editBox = document.createElement("textarea");
      editBox.className = "bigInputBox";
      editBox.value = postContent;

      const editButton = document.createElement("button");
      editButton.innerHTML = "Edit";
      editButton.addEventListener("click", () => {
        fetch(process.env.REACT_APP_API_LOCATION + `/threads/${postId}/edit`, {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + props.token,
          },
          body: JSON.stringify({
            content: editBox.value,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            window.location.reload();
          })
          .catch((error) => {
            return "Error" + error;
          });
      });

      hideEditPanel.appendChild(editBox);
      hideEditPanel.appendChild(editButton);

      const link = document.createElement("p");
      link.classList = "smallText blueLink";
      link.innerHTML = "Edit";
      link.addEventListener("click", () => {
        if (hideEditPanel.style.display === "none") {
          hideEditPanel.style.display = "flex";
        } else {
          hideEditPanel.style.display = "none";
        }
      });

      const wrapperDiv = document.createElement("div");
      wrapperDiv.appendChild(link);
      wrapperDiv.appendChild(hideEditPanel);

      return wrapperDiv;
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
            postArea.innerHTML = "";
            postArea.appendChild(message);
          } else {
            data.forEach((element) => {
              const postDiv = document.createElement("li");
              postDiv.key = element._id;
              postDiv.classList = "roundBorder lightWhite flexColumn";
              postDiv.appendChild(
                createPost(
                  element.thread.title,
                  element.author.username,
                  element.content,
                  element.time
                )
              );
              if (element.author.username === props.username) {
                postDiv.appendChild(editLink(element._id, element.content));
              }
              if (
                props.userType === "administrator" ||
                props.userType === "owner"
              ) {
                postDiv.appendChild(deleteLink(element._id));
              }
              postArea.innerHTML = "";
              postArea.appendChild(postDiv);
            });
          }
        })
        .catch((error) => {
          return "Error" + error;
        });
    }
    getPosts();
  }, [props.token, props.userType, props.username, id]);

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
        <ul id="postArea">
          <p> Loading, please wait. </p>
        </ul>
      </div>
      <form onSubmit={(e) => postNewPost(e)}>
        <label htmlFor="content"> New post content: </label>
        <textarea
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="bigInputBox"
        ></textarea>
        <br />
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
