var city = document.querySelector('#city');
var searchButton = document.querySelector('#searchCity');
var currentCond = document.querySelector('#currentConditions');
var currentTemp = document.querySelector('#currentTempSpan');
var forecast = document.querySelector('#forecast');
var table = document.querySelector('#forecastTable');

searchButton.addEventListener('click', function() {
    getWeatherData(city.value);
})

city.addEventListener('keyup', function(e){
       if(e.key === 'Enter'){
        getWeatherData(city.value);
       }
})

var getWeatherData = async function(cityName) {
    var locationResponse = await axios.get(`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=9CZDY6AVmSVBWVF6STPhgkLly6pUXHNL&q=${cityName} `).then ( res => {
        console.log(res.data[0])
        return res.data[0].Key;
    })
    .catch(err => {
        console.error(err);
    })


    console.log(locationResponse);

   var conditionsResponse = axios.get(` http://dataservice.accuweather.com/currentconditions/v1/${locationResponse}?apikey=9CZDY6AVmSVBWVF6STPhgkLly6pUXHNL`).then ( res => {
    displayCurrentconditions(res.data[0].Temperature.Metric.Value);
    console.log(res.data[0].Temperature.Metric.Value)
    return res.data[0].Temperature.Metric.Value;
    })
    .catch(err => {
    console.error(err);
    })
    
    var forecastResponse = await axios.get(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationResponse}?apikey=9CZDY6AVmSVBWVF6STPhgkLly6pUXHNL&metric=true`).then( res => {
        show5DaysForecast(res.data.DailyForecasts)
        console.log(res.data.DailyForecasts)
        //return res.data[0].Temperature.Metric.Value;
        })
        .catch(err => {
        console.error(err);
        })

}

function displayCurrentconditions(temp){
    currentTemp.innerHTML = `${temp} &#8451;`;
    currentCond.style.display = 'flex';
}

function show5DaysForecast(data){
    console.log(data);
    var htmlTable = ``;
    
    data.forEach(el => {
        htmlTable += `
        <tr>
        <td>${displayDate(el.Date)}</td>
        <td>${el.Temperature.Minimum.Value}</td>
        <td>${el.Temperature.Maximum.Value}</td>
        </tr>
        `;
    })
   
    table.innerHTML = htmlTable;
    forecast.style.display = 'flex';
    console.log(htmlTable)
}

function displayDate(date){
    
    var oldDate = new Date(date);
    const day = oldDate.getDay()
    const options = { weekday: "long" };
    const days = (new Intl.DateTimeFormat("en-US", options).format(oldDate));
    const newDate = `${days}`
    return newDate;
}
displayDate('2023-04-08T07:00:00+03:00');