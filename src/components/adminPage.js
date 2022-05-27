import React, { useEffect } from "react";

const AdminPage = function AdminPage(props) {
  useEffect(() => {
    function createUser(userId, userName, userType) {
      const mainLi = document.createElement("li");
      mainLi.innerHTML = userName;
      const changeAuthButton = document.createElement("button");
      if (userType === "user") {
        changeAuthButton.innerHTML = "Make admin";
        changeAuthButton.addEventListener("click", () => {
          fetch(
            process.env.REACT_APP_API_LOCATION + `/user/admin/${userId}/make`,
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
        mainLi.appendChild(changeAuthButton);
      } else if (userType === "administrator") {
        changeAuthButton.innerHTML = "Remove admin";
        changeAuthButton.addEventListener("click", () => {
          fetch(
            process.env.REACT_APP_API_LOCATION + `/user/admin/${userId}/remove`,
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
        mainLi.appendChild(changeAuthButton);
      }
      return mainLi;
    }
    const mainBox = document.getElementById("msgBox");
    const ownerArea = document.getElementById("ownerArea");
    const adminArea = document.getElementById("adminArea");
    const userArea = document.getElementById("userArea");
    function getUsers() {
      if (!props.token) {
        mainBox.innerHTML = "Not logged in.";
      }
      fetch(process.env.REACT_APP_API_LOCATION + "/user", {
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
            const oneUser = createUser(
              element._id,
              element.username,
              element.type
            );
            switch (element.type) {
              case "user":
                userArea.appendChild(oneUser);
                break;
              case "administrator":
                adminArea.appendChild(oneUser);
                break;
              case "owner":
                ownerArea.appendChild(oneUser);
                break;
              default:
                throw new Error("User is of erroneous type" + element.type);
            }
          });
        })
        .catch((error) => {
          return "Error" + error;
        });
    }
    getUsers();
  }, [props.token]);

  return (
    <div className="darkBlue main topMargin marginMiddle">
      <div id="msgBox">
        <div>
          <p> Permission rules: </p>
          <p> Owners may add admins, remove admins and delete posts. </p>
          <p> Admins may add admins and delete posts. </p>
          <p> Users cannot add/remove admins and cannot delete posts.</p>
          <p>
            {" "}
            All members can edit their own posts. Posts cannot be edited by
            others, regardless of permissions.{" "}
          </p>
        </div>
      </div>
      <div id="owner" className="topMargin">
        Owners
        <ul id="ownerArea"></ul>
      </div>
      <div id="admin" className="topMargin">
        Administrators
        <ul id="adminArea"></ul>
      </div>
      <div id="user" className="topMargin">
        Users
        <ul id="userArea"></ul>
      </div>
    </div>
  );
};

export default AdminPage;
