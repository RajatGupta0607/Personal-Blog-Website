const searchBtn = document.querySelector("#searchBtn");
const closeBtn = document.querySelector("#closeBtn");
const searchBar = document.querySelector(".searchBar");
const loader = document.querySelector(".overlay");

searchBtn.addEventListener("click", () => {
  searchBar.classList.add("active");
});

closeBtn.addEventListener("click", () => {
  searchBar.classList.remove("active");
});

window.addEventListener("load", () => {
  loader.hidden = true;
});
