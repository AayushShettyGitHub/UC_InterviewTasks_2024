const apiKey = "31833e97b0a6d908b01209a1017c3b05";
const weatherapp__cityInput = document.querySelector(".weatherapp__cityInput");
const weatherapp__search = document.querySelector(".weatherapp__search");
const location1= document.querySelector(".weatherapp__location");
const  weatherapp__favbutton=document.querySelector(".weather-app__fav-button");
const favouritesDropDown=document.querySelector(".weatherapp__favSelect");

const btn = document.getElementById('btn');
//cityName=document.getElementById("city").textContent;

let slicedForecasts,forecastFive,cityVar;    //sliced=DayForecast   five=hourForecast cityVar=city fetched using user coordinates
let flagLoc=0;   //To check if city fetched from cityname or user weatherapp__location



let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

window.addEventListener('load', () => {
   // Ensure this class matches the dropdown element

  const favouritesDropDown= JSON.parse(localStorage.getItem("favorites")) || [];
  
  

 
  
  favouritesDropDown.forEach((city)=>{
  updateFavoritesDropdown();
});
});















function updateFavButton(cityName) {
    if (favorites.includes(cityName)) {
        weatherapp__favbutton.textContent = "Remove from Favorites";
        weatherapp__favbutton.style.backgroundColor="red";
    } else {
        weatherapp__favbutton.textContent = "Add to Favorites";
        weatherapp__favbutton.style.backgroundColor=" hsl(234, 65%, 44%)";
    }
    updateFavoritesDropdown();
}

function addFavorites(cityName) {
    if (!favorites.includes(cityName)) {
        favorites.push(cityName);
        localStorage.setItem("favorites", JSON.stringify(favorites));
        updateFavButton(cityName);
        alert(`${cityName} added to favorites`);
        
    }
}

function removeFavorites(cityName) {
    if (favorites.includes(cityName)) {
        favorites = favorites.filter(favCity => favCity !== cityName);
        localStorage.setItem("favorites", JSON.stringify(favorites));
        updateFavButton(cityName);
        alert(`${cityName} removed from favorites`);
        
    }
}

weatherapp__favbutton.addEventListener("click", () => {
    if(weatherapp__cityInput.value){
   const cityName = document.getElementById("city").textContent.split(",")[0];
    if (favorites.includes(cityName)) {
        removeFavorites(cityName);
    } else {
        addFavorites(cityName);
    }}
    else{
        alert("Enter city first")
    }
});

function updateFavoritesDropdown() {
    const dropdown = document.querySelector(".weatherapp__favSelect");
    dropdown.innerHTML = "";
    favorites.forEach(city => {
        const option = document.createElement("option");
        option.value = city;
        option.textContent = city;
        dropdown.appendChild(option);
    });

    favouritesDropDown.addEventListener("change", async (event) => {
        const selectedCity = event.target.value;
        if (selectedCity) {
            try {
                weatherapp__cityInput.value=selectedCity;
                const weatherData = await getWeatherData(selectedCity);
                const forecastData = await getForecastData(selectedCity);
                displayWeatherInfo(weatherData);
                displayForecastHInfo(forecastData);
                displayForecastDInfo(forecastData);
            } catch (error) {
                console.error(error);
                displayError("An error occurred while fetching the weather data.");
            }
        }
    });
    
}






async function leftClick() {
    btn.style.left = '0';
     document.body.style.background='linear-gradient(180deg, rgba(89, 122, 196, 0.717), rgba(7, 43, 127, 0.679  ))';
   
    let cityVal;
    if(flagLoc==0){
        cityVal=weatherapp__cityInput.value;
    }
    else{
        cityVal=cityVar;
    }
	
     const weatherData3 =await  getWeatherData(cityVal);
     const forecastData2= await getForecastData(cityVal);
    const { main: { temp, feels_like } } = weatherData3;
    document.getElementById("temperature").textContent =`${(temp - 273.15).toFixed(2)}°C`;
    document.getElementById("feel").textContent =`Feels Like: ${(feels_like - 273.15).toFixed(2)}°C`;
    const hourlyForecastTemps= document.querySelectorAll(".cel");

        forecastData2.list.slice(0, hourlyForecastTemps.length).forEach((forecast, index) => {
            const tempF = (forecast.main.temp-273.15).toFixed(2);
            hourlyForecastTemps[index].textContent = `${tempF}°C`;
        });

   
    const dailyForecastTemps= document.querySelectorAll(".cel1");
    slicedForecasts.forEach((forecast,index)=>{
        const tempF = (forecast.main.temp-273.15).toFixed(2);
        dailyForecastTemps[index].textContent = `${tempF}°C`;
    

      

    });
}


async function rightClick() {
    btn.style.left = '110px';
    document.body.style.background='linear-gradient(180deg, rgb(248, 8, 8), rgba(253, 11, 11, 0.973))';
    let cityVal;
    if(flagLoc==0){
        cityVal=weatherapp__cityInput.value;
    }
    else{
        cityVal=cityVar;
    }
	
    const weatherData2 =await  getWeatherData(cityVal);
    const forecastData2= await getForecastData(cityVal);
    const { main: { temp, feels_like } } = weatherData2;
    document.getElementById("temperature").textContent =`${((temp*(9/5))-459.67).toFixed(2)}°F`;
    document.getElementById("feel").textContent =`Feels Like: ${((feels_like*(9/5))-459.67).toFixed(2)}°F`;

    const hourlyForecastTemps= document.querySelectorAll(".cel");
        forecastData2.list.slice(0, hourlyForecastTemps.length).forEach((forecast, index) => {
            const tempF = ((forecast.main.temp * 9/5) - 459.67).toFixed(2);
            hourlyForecastTemps[index].textContent = `${tempF}°F`;


    });

    const dailyForecastTemps= document.querySelectorAll(".cel1");
    slicedForecasts.forEach((forecast,index)=>{
        const tempF = ((forecast.main.temp * 9/5) - 459.67).toFixed(2);
        dailyForecastTemps[index].textContent = `${tempF}°F`;
    });


}

weatherapp__search.addEventListener("click", async (event) => {
    flagLoc=0;     //necessary when you use weatherapp__search afer use your weatherapp__location
    btn.style.left = '0';
    document.body.style.background='linear-gradient(180deg, rgba(89, 122, 196, 0.717), rgba(7, 43, 127, 0.679  ))';
  
  
    event.preventDefault();
    const city = weatherapp__cityInput.value;
    if (city) {
        try {
            const weatherData = await getWeatherData(city);
            const forecastData = await getForecastData(city);
            displayWeatherInfo(weatherData);
            displayForecastHInfo(forecastData);
            displayForecastDInfo(forecastData);
        } catch (error) {
            console.error(error);
            displayError("An error occurred while fetching the weather data.");
        }
    } else {
        displayError("Enter a city.");
    }
});


location1.addEventListener("click",async (event1)=>{
    flagLoc=1;
    btn.style.left = '0';
    document.body.style.background='linear-gradient(180deg, rgba(89, 122, 196, 0.717), rgba(7, 43, 127, 0.679  ))';
    try{    
        const coordinates = await getCoordinates();    
         cityVar = await getLocation(coordinates.latitude, coordinates.longitude);   
        const weatherData1 = await getWeatherData(cityVar);
        const forecastData1 = await getForecastData(cityVar);
        displayWeatherInfo(weatherData1);
        displayForecastHInfo(forecastData1);
        displayForecastDInfo(forecastData1);


    }
    catch (error) {
        console.error(error);
        displayError("Location details not found.");
    }

});

async function getWeatherData(city) {
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const response = await fetch(currentWeatherUrl);
    if (!response.ok) {
        throw new Error("Weather data not found");
    }
    else{
    return await response.json();
}

   
}
async function getForecastData(city){
     const hourlyForecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
     const hourlyResponse = await fetch(hourlyForecastUrl);
     if (!hourlyResponse.ok) {
         throw new Error("Hourly forecast data not found");
     }
     else{
     
 
     return  await hourlyResponse.json();
    }

}



function displayWeatherInfo(data) {
    console.log(data);
   
    const { name: city, sys:{country}, main: { temp, feels_like }, weather: [{ description, id, icon }] } = data;

    
    const iconDisplay=document.getElementById("ikon");
    
    let iconurlImg= `http://openweathermap.org/img/wn/${icon}@2x.png`;
       

    document.getElementById("city").textContent = `${city}, ${country}`;
    document.getElementById("temperature").textContent =`  ${(temp - 273.15).toFixed(2)}°C`;
    document.getElementById("feel").textContent = `Feels Like : ${(feels_like - 273.15).toFixed(2)}°C`;
    document.getElementById("descbox").textContent = `${description.toUpperCase()}`;  
    iconDisplay.src=iconurlImg;
    updateFavButton(city);

  
    
    
}
function displayForecastHInfo(data) {
    console.log(data);
    const forecastContainer = document.querySelector(".templist");
    forecastContainer.innerHTML = "";
    const currentTime = new Date().getTime();
    const filteredForecasts = data.list.filter(forecast => {
        const forecastTime = new Date(forecast.dt_txt).getTime();
        return forecastTime > currentTime;
    });

     forecastFive = filteredForecasts.slice(0, 5);
    forecastFive.forEach(forecast => {
        const { dt_txt, main: { temp }, weather: [{ description }] } = forecast;

        const hour = new Date(dt_txt).getHours();

        const next = document.createElement("div");
        next.className = "next";

        const inner = document.createElement("div");
        inner.className = "inner";

        const timeElement = document.createElement("p");
        timeElement.className = "time";
        timeElement.textContent = `${hour}:00 `; 

        const tempElement = document.createElement("p");
        tempElement.className = "cel";
        tempElement.textContent = `${(temp - 273.15).toFixed(2)}°C`;

        const descElement = document.createElement("p");
        descElement.className = "subDesc";
        descElement.textContent = description;

       

        inner.appendChild(timeElement);
        inner.appendChild(tempElement);
        next.appendChild(inner);
        next.appendChild(descElement);
        

        forecastContainer.appendChild(next);
    });
}






function displayForecastDInfo(data) {
    console.log(data);
    const forecastContainer1 = document.querySelector(".weekF");
    forecastContainer1.innerHTML = "";
    const currentTime = new Date();
    const filteredForecasts = data.list.filter(forecast => {
       
        const forecastDate = new Date(forecast.dt_txt);
        const forecastHour = forecastDate.getHours();
    
      
        return forecastHour === 12;
    });
    
      slicedForecasts=filteredForecasts.slice(1,5);
   
    

    
    slicedForecasts.forEach(forecast => {
        const { dt_txt, main: { temp }, weather: [{ description }] } = forecast;

        const hour = new Date(dt_txt).getHours();
        const date=new Date(dt_txt);

        const dayF = document.createElement("div");
        dayF.className = "dayF";

       

        const dateElement = document.createElement("p");
        dateElement.className = "date";
        dateElement.textContent = `${date}`; 

        const tempElement1 = document.createElement("p");
        tempElement1.className = "cel1";
        tempElement1.textContent = `${(temp - 273.15).toFixed(2)}°C`;

        const descElement1 = document.createElement("p");
        descElement1.className = "subDesc1";
        descElement1.textContent = description;

       

        dayF.appendChild(dateElement);
        dayF.appendChild(tempElement1);
        dayF.appendChild(descElement1);
        

        forecastContainer1.appendChild(dayF);
    });

    

}
async function getCoordinates(){
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    const { latitude, longitude } = position.coords;
                    resolve({ latitude, longitude });
                },
                error => {
                    showError(error);
                    reject(error);
                })}
            });
            }
        

    
async function getLocation(lat,lon){
    const cityUrl = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${apiKey}`;
    const response2 = await fetch(cityUrl);
    if (!response2.ok) {
        throw new Error("Weather data not found");
    }
    const data = await response2.json();
    return data[0].name;
}
    

function showPosition(position){
    console.log(position);
    const latitude = position.coords.latitude; 
    const longitude = position.coords.longitude; 
    return getLocation(latitude,longitude);
   
}
function showError(error) {
    displayError("Unknown Error");
}

function displayError(message) {
    alert(message);
   
   
}