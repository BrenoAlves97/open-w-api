//Variáveis e seleção de elementos
const apiFlagUrl = `https://countryflagsapi.com/png/`;
const apiKey = `0e4f2b94b5ed4fcf7a588a25bd5d7fc3`;

const cityInput = document.querySelector('#city-input');
const btnSearch = document.querySelector('#search-btn');

const cityElement = document.querySelector('#city-name');
const countryElement = document.querySelector('#country');
const temperatureElement = document.querySelector('#temperature span');
const weatherConditionElement = document.querySelector('#weather-condition');
const iconElement = document.querySelector('.conditions img');
const humidityElement = document.querySelector('#humidity span');
const windyElement = document.querySelector('#windy span');
const containerWeather = document.querySelector('.weather-data');

// Funções

const getWheaterDatas = async (city) => {

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`

    const res = await fetch(apiUrl);
    const data = await res.json();
    
    return data;
};

const showWheaterDatas = async (city) => {

    const data = await getWheaterDatas(city);

    cityElement.innerText = data.name;
    countryElement.setAttribute('src', apiFlagUrl + data.sys.country);
    temperatureElement.innerText = parseInt(data.main.temp);
    weatherConditionElement.innerText = data.weather[0].description;
    iconElement.setAttribute('src', `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
    humidityElement.innerText = `${data.main.humidity}%`;
    windyElement.innerText = `${parseInt(data.wind.speed)}km/h`;

    containerWeather.classList.remove('hide');
    console.log(data);

};


// Eventos

btnSearch.addEventListener('click', (e) => {

    e.preventDefault();

    const city = cityInput.value;

    if (city === '') {
        cityInput.classList.add('error');
    } else {
        showWheaterDatas(city);
    }
});
