const searchBtn = document.querySelector("#searchBtn");
const closeBtn = document.querySelector("#closeBtn");
const searchBar = document.querySelector(".searchBar");

searchBtn.addEventListener("click", () => {
  searchBar.classList.add("active");
});

closeBtn.addEventListener("click", () => {
  searchBar.classList.remove("active");
});
