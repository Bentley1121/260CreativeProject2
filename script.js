window.onload = function() {
  const url = "https://gateway.marvel.com:443/v1/public/comics?format=digital%20comic&formatType=comic&noVariants=true&hasDigitalIssue=true&orderBy=issueNumber&limit=20&apikey=85c4c6f5366b81d732e60a96d6271df9";
  fetch(url)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      let results = "";
      clearResults();
      addResults(json);
      console.log(json);
    });
};

function clearResults() {
  document.getElementsByClassName("comics-container")[0].innerHTML = "";
}

function addResults(results) {
  let comics = "";
  results.data.results.forEach(element => {
    comics += "<a href='" + element.urls[0].url + "'>";
    comics += "<div class='comic-item'>";
    comics += "<p>";
    comics += element.title;
    comics += "</p>";
    comics += "<img class='comic-thumbnail' src='" + element.thumbnail.path + "/detail.jpg'>";
    comics += "</div>";
    comics += "</a>";
    console.log(element.title);
  });
  document.getElementsByClassName("comics-container")[0].innerHTML = comics;
}

let queryIndex = 0;
let nextButton1 = document.getElementsByClassName("next")[0];
let nextButton2 = document.getElementsByClassName("next")[1];
let previousButton1 = document.getElementsByClassName("previous")[0];
let previousButton2 = document.getElementsByClassName("previous")[1];
let cachedContent = [];
nextButton1.addEventListener("click", next);
nextButton2.addEventListener("click", next);
previousButton1.addEventListener("click", previous);
previousButton2.addEventListener("click", previous);

function next() {
  queryIndex++;
  if (queryIndex != 0)
  {
    previousButton1.classList.remove("hidden");
    previousButton2.classList.remove("hidden");
  }

  clearResults();
  const url = "https://gateway.marvel.com:443/v1/public/comics?format=digital%20comic&formatType=comic&noVariants=true&hasDigitalIssue=true&orderBy=issueNumber&limit=20&offset=" + queryIndex * 20 + "&apikey=85c4c6f5366b81d732e60a96d6271df9";
  fetch(url)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      let results = "";
      addResults(json);
      console.log(json);
    });
}

function previous() {
  queryIndex--;
  if (queryIndex == 0)
  {
    previousButton1.classList.add("hidden");
    previousButton2.classList.add("hidden");
  }

  clearResults();
  const url = "https://gateway.marvel.com:443/v1/public/comics?format=digital%20comic&formatType=comic&noVariants=true&hasDigitalIssue=true&orderBy=issueNumber&limit=20&offset=" + queryIndex * 20 + "&apikey=85c4c6f5366b81d732e60a96d6271df9";
  fetch(url)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      let results = "";
      addResults(json);
      console.log(json);
    });
}