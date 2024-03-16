
let Longitude;
let Latitude;
let currentlocation;
let loc1;

const inputElement = document.getElementById('inputValue');


inputElement.addEventListener('keypress', function(event) {
    
    if (event.key === 'Enter') {
        
        search();
    }
});

getCurrentLocation();

function getCurrentLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  Latitude = position.coords.latitude;
  Longitude = position.coords.longitude;
  //console.log(Latitude, Longitude);
  let text = Latitude + "," + Longitude;
  locationDetails(text);
  initializeMap(Latitude,Longitude);
  //dateInput(text);

  //pass data for deforlt location methode
}

//------------------------------------------------------------------------------------------------

//---------------------------------------------------------------- whne serch butten pressing
function search() {
  let inputValue = document.getElementById("inputValue").value;
  //alert(inputValue);
  locationDetails(inputValue);
}

function locationDetails(loc) {
  //after serching place
  //alert(location);

  fetch(
    `https://api.weatherapi.com/v1/current.json?key=0231768e294f4a5abbf60959241503&q=${loc}`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      console.log(data.current.temp_c);
      console.log(data.current.wind_kph);
      console.log(data.current.humidity);
      console.log(data.current.condition.icon);
      console.log(data.current.condition.text);

      console.log(data.location.name);
      console.log(data.location.country);
      console.log(data.location.region);

      console.log(data.location.lat);
      console.log(data.location.lon);

      let icone = data.current.condition.icon;
      document.getElementById("icon").src = icone;

      let condition = data.current.condition.text;
       document.getElementById("contion").textContent = condition;

   

      let time_date = data.location.localtime;
     
      let loc = data.location.name;
      document.getElementById("location").textContent = loc;
      loc1=loc;

      locationDtailLastSeven(loc);

      let countryy = data.location.country;
      document.getElementById("countryy").textContent = countryy;

      let region = data.location.region;
      document.getElementById("regione").innerHTML = region;

      let temp = data.current.temp_c;
      document.getElementById("temp").textContent = temp + "'c";

      let wind_speed = data.current.wind_kph;
      document.getElementById("wind_speed").textContent = wind_speed + " kph";

      let humidity = data.current.humidity;
      document.getElementById("humidity").textContent = humidity;

      let lat = data.location.lat;
      document.getElementById("lat").textContent = lat + "'";

      let lon = data.location.lon;
      document.getElementById("lon").textContent = lon + "'";

  initializeMap(lat,lon);

 
     
    })
    .catch((error) => {
      console.log("Error fetching weather data:", error);
      return null; // Return null or handle error as needed
    });
    
  // locationDtailLastSeven(location, time);
}

function locationDtailLastSeven(currentlocation) {
  fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=0231768e294f4a5abbf60959241503&q=${currentlocation}&days=8`
  )
    .then((res) => res.json())
    .then((data) => {
      //-----------------------------day 1----------------------------------
      //console.log(data);
      //   console.log(data.forecast.forecastday[1].date);
      //   console.log(data.forecast.forecastday[1].day.condition.text);
      //   console.log(data.forecast.forecastday[1].day.condition.icon);
      //   console.log(data.forecast.forecastday[1].day.avgtemp_c);

      var parentElement = document.getElementById("perant");

      parentElement.innerHTML = ""; //romove all pertant div i was created before

      for (var i = 1; i < 8; i++) {
        var cardDiv = document.createElement("div");
        cardDiv.classList.add(
          "col",
          "d-flex",
          "justify-content-center",
          "p-2",
          "pb-5"
        );

        var card = document.createElement("div");
        card.classList.add("card", "p-4");
        card.style.width = "15rem";

        var cardTitle = document.createElement("h4");
        cardTitle.classList.add(
          "card-title",
          "bg-primary",
          "d-flex",
          "justify-content-center"
        );
        cardTitle.textContent = data.forecast.forecastday[i].date;
        cardTitle.id = "date" + i;
        //console.log(cardTitle.id);//date string chaking

        var cardImage = document.createElement("img");
        cardImage.classList.add("card-img-top", "mx-auto");
        cardImage.src = data.forecast.forecastday[i].day.condition.icon;
        cardImage.alt = "Card image cap";
        cardImage.style.width = "10rem";
        cardImage.id = "icone" + i;

        var cardBody = document.createElement("div");
        cardBody.classList.add("card-body");

        var temperatureElement = document.createElement("h6");
        temperatureElement.classList.add("card-text");
        temperatureElement.textContent =
          data.forecast.forecastday[i].day.avgtemp_c + "'C";
        temperatureElement.id = "temp" + i;

        var additionalTextElement = document.createElement("h3");
        additionalTextElement.classList.add("card-text");
        additionalTextElement.textContent =
          data.forecast.forecastday[i].day.condition.text;
        additionalTextElement.id = "text" + i;

        cardBody.appendChild(temperatureElement);
        cardBody.appendChild(additionalTextElement);

        card.appendChild(cardTitle);
        card.appendChild(cardImage);
        card.appendChild(cardBody);

        cardDiv.appendChild(card);

        parentElement.appendChild(cardDiv);
      }
    })
    .catch((error) => console.log("Error fetching forecast data:", error));
}



function dateInput(increment) {

 console.log(loc1);

  
  var parentElement = document.getElementById("perant");

  parentElement.innerHTML = ""; //romove all pertant div i was created before

  

  for (let k = 0; k < 7; k++) {
   
    fetch(
      `https://api.weatherapi.com/v1/history.json?key=0231768e294f4a5abbf60959241503&q=${loc1}&dt=${increment}&days=8`
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log(data.forecast.forecastday[0].day.condition.text);
         console.log(data.forecast.forecastday[0].day.condition.icon);
        // console.log(data.forecast.forecastday[0].day.avgtemp_c);
       
        
      
        var cardDiv = document.createElement("div");
        cardDiv.classList.add(
          "col",
          "d-flex",
          "justify-content-center",
          "p-2",
          "pb-5"
        );

        var card = document.createElement("div");
        card.classList.add("card", "p-4");
        card.style.width = "15rem";

        var cardTitle = document.createElement("h4");
        cardTitle.classList.add(
          "card-title",
          "bg-primary",
          "d-flex",
          "justify-content-center"
        );
        cardTitle.textContent =increment ;
        cardTitle.id = "date" + k;
        //console.log(cardTitle.id);//date string chaking
        console.log("mmmmmmmmmmmmmmmmm");
        console.log(increment);

        var cardImage = document.createElement("img");
        cardImage.classList.add("card-img-top", "mx-auto");
        cardImage.src = data.forecast.forecastday[0].day.condition.icon;
        cardImage.alt = "Card image cap";
        cardImage.style.width = "10rem";
        cardImage.id = "icone" + k;

        var cardBody = document.createElement("div");
        cardBody.classList.add("card-body");

        var temperatureElement = document.createElement("h6");
        temperatureElement.classList.add("card-text");
        temperatureElement.textContent =
        data.forecast.forecastday[0].day.avgtemp_c+ "'C";
        temperatureElement.id = "temp" + k;

        var additionalTextElement = document.createElement("h3");
        additionalTextElement.classList.add("card-text");
        additionalTextElement.textContent =
        data.forecast.forecastday[0].day.condition.text;
        additionalTextElement.id = "text" + k;

        cardBody.appendChild(temperatureElement);
        cardBody.appendChild(additionalTextElement);

        card.appendChild(cardTitle);
        card.appendChild(cardImage);
        card.appendChild(cardBody);

        cardDiv.appendChild(card);

        parentElement.appendChild(cardDiv);
        increment = incrementDate(increment);
        })
   .catch((error) => console.log("Error fetching forecast data:", error));
       
      

  }
}

function incrementDate(dateString) {
  let currentDate = new Date(dateString);

  currentDate.setDate(currentDate.getDate() -1);

  let year = currentDate.getFullYear();
  let month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Adding 1 to month because it's zero-based index
  let day = String(currentDate.getDate()).padStart(2, "0");
  let updatedDateString = `${year}-${month}-${day}`;

  return updatedDateString;
}
function updateTime() {
  var currentTimeElement = document.getElementById("currentTime");
  var currentTime = new Date();
  var hours = currentTime.getHours();
  var minutes = currentTime.getMinutes();
  var seconds = currentTime.getSeconds();
  
  // Add leading zeros if necessary
  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  
  currentTimeElement.textContent =  "    "    + hours + ":" + minutes + ":" + seconds;
}
var map;
function initializeMap(latitude, longitude) {
  console.log(latitude, longitude);
    if (map) {

        map.remove();
    }
    map = L.map('map').setView([latitude, longitude], 13); // Set initial coordinates and zoom level

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    var marker = L.marker([latitude, longitude]).addTo(map); // Add a marker at specified coordinates
}
// Initial call to update time
updateTime();

// Refresh the time every second (1000 milliseconds)
setInterval(updateTime, 1000);

document.getElementById("submitForm").addEventListener("submit", function(event){
  event.preventDefault();
  let increment = document.getElementById("dayInput").value;
  console.log(increment);
  dateInput(increment);

}
)
// Get current date
let currentDate = new Date().toISOString().split('T')[0];
document.getElementById("dayInput").setAttribute("max", currentDate);

