const charLimit = document.querySelector("#charLimit");
const artBody = document.querySelector("#body");

function countChar() {
  let strLength = artBody.value.length;
  charLimit.textContent = `${strLength}/10000`;
}

body.addEventListener("keyup", countChar);

countChar();
