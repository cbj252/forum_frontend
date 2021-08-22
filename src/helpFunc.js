export function createPost(threadTitle, username, postContent, time) {
  const mainDiv = document.createElement("div");
  mainDiv.classList = "flexChange";

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

export function createThread(threadId, threadTitle) {
  const mainLi = document.createElement("li");
  mainLi.key = threadId;
  const img = document.createElement("img");
  img.src = "https://i.ibb.co/bv5CNx7/hamburger-menu.png";
  img.alt = "thread-logo";
  img.style.border = 0;
  const link = document.createElement("a");
  link.href = "/thread/" + threadId;
  link.classList = "flexRow flexCrossCenter topMargin";
  const title = document.createElement("p");
  title.innerHTML = threadTitle;

  link.appendChild(img);
  link.appendChild(title);
  mainLi.appendChild(link);
  return mainLi;
}
