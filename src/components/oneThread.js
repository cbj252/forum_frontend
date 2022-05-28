import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import MakeNewPost from "./makeNewPost";

const OneThread = function OneThread(props) {
  let { id } = useParams();

  useEffect(() => {
    const postArea = document.getElementById("postArea");

    function createPost(threadTitle, username, postContent, time, key) {
      const mainLi = document.createElement("li");
      mainLi.classList = "flexChange postBox roundBorder lightWhite topMargin";
      mainLi.key = key;

      const col1 = document.createElement("div");
      col1.classList = "gridColumn1";

      const col2 = document.createElement("div");
      col2.classList = "gridColumn2";
      col2.style.borderLeft = "1px solid black";

      const title = document.createElement("a");
      title.innerHTML = threadTitle;
      title.href = "/";

      const timestamp = document.createElement("p");
      timestamp.classList = "smallText";
      timestamp.innerHTML = `by ${username} >> ${new Date(time)}`;

      const content = document.createElement("p");
      content.classList = "topMargin";
      content.innerHTML = postContent;

      const postmaker = document.createElement("p");
      postmaker.classList = "gridColumn2 halfLeftMargin";
      postmaker.innerHTML = `${username}`;

      col1.appendChild(title);
      col1.appendChild(timestamp);
      col1.appendChild(content);
      col2.appendChild(postmaker);

      const changePostLinks = document.createElement("span");
      changePostLinks.classList = "flexRow topMargin";

      if (username === props.username) {
        changePostLinks.appendChild(editLink(key, postContent));
      }
      if (props.userType === "administrator" || props.userType === "owner") {
        changePostLinks.appendChild(deleteLink(key));
      }
      if (changePostLinks.innerHTML !== "") {
        col1.appendChild(changePostLinks);
      }

      mainLi.appendChild(col1);
      mainLi.appendChild(col2);
      return mainLi;
    }

    function deleteLink(postId) {
      const link = document.createElement("p");
      link.classList = "smallText blueLink halfLeftMargin";
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
            postArea.innerHTML = "";
            data.forEach((element) => {
              const newPost = createPost(
                element.thread.title,
                element.author.username,
                element.content,
                element.time,
                element._id
              );
              postArea.appendChild(newPost);
            });
          }
        })
        .catch((error) => {
          return "Error" + error;
        });
    }

    getPosts();
  }, [props.token, props.userType, props.username, id]);

  function changePageUI() {
    return (
      <span className="topMargin smallText flexRow flexCrossCenter flexEnd">
        <span> 28 posts • Page 1 of 2 • </span>
        <span className="pageBox halfLeftMargin"> 1 </span>
        <span className="pageBox halfLeftMargin"> 2 </span>
      </span>
    );
  }

  return (
    <div>
      {changePageUI()}
      <ul id="postArea">
        <p> Loading, please wait. </p>
      </ul>
      {changePageUI()}
      <MakeNewPost token={props.token} />
    </div>
  );
};

export default OneThread;
