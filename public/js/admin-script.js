window.addEventListener("load", () => {
  loader.hidden = true;
});

const charLimit = document.querySelector("#charLimit");
const artBody = document.querySelector("#body");
const loader = document.querySelector(".overlay");

function countChar() {
  let strLength = artBody.value.length;
  charLimit.textContent = `${strLength}/10000`;
}

body.addEventListener("keyup", countChar);

countChar();
