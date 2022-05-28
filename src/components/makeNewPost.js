import React, { useState } from "react";
import { useParams } from "react-router-dom";

const MakeNewPost = function MakeNewPost(props) {
  let { id } = useParams();
  const [content, setContent] = useState("");

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
    <form
      className="roundBorder topMargin leftMargin rightMargin lightWhite"
      onSubmit={(e) => postNewPost(e)}
    >
      <label className="underline" htmlFor="content">
        {" "}
        New post content:{" "}
      </label>
      <textarea
        name="content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="bigInputBox topMargin"
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
  );
};

export default MakeNewPost;
