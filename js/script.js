document.querySelector('#button_city').onclick = myWeatherClick;

function myWeatherClick() {
    let city_name = document.querySelector('.input_city').value;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=f51990e7149906aa689774767bf390da&unit=metric`)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => {

            let description_weather = ((data['weather'][0].description));
            let temp = ((data['main']['temp']) - 273.15);
            let feels_like = ((data['main']['feels_like']) - 273.15);
            let temp_min = ((data['main']['temp_min']) - 273.15);
            let temp_max = ((data['main']['temp_max']) - 273.15);
            let pressure = ((data['main']['pressure'])) + " mbar";
            let humidity = ((data['main']['humidity'])) + " %";
            let sea_level = ((data['main']['sea_level']));
            let speed = ((data['wind']['speed'])) + " m/s";

            let temp_convert_to_celsius = Math.round(temp * 100) / 100;
            let feels_like_convert_to_celsius = Math.round(feels_like * 100) / 100;
            let temp_min_convert_to_celsius = Math.round(temp_min * 100) / 100;
            let temp_max_convert_to_celsius = Math.round(temp_max * 100) / 100;
            document.getElementById('description_weather').innerHTML = description_weather;
            document.getElementById('temp').innerHTML = temp_convert_to_celsius + " C";
            document.getElementById('feels_like').innerHTML = feels_like_convert_to_celsius + " C";
            document.getElementById('temp_min').innerHTML = temp_min_convert_to_celsius + " C";
            document.getElementById('temp_max').innerHTML = temp_max_convert_to_celsius + " C";
            document.getElementById('pressure').innerHTML = pressure;
            document.getElementById('humidity').innerHTML = humidity;
            document.getElementById('sea_level').innerHTML = sea_level;
            document.getElementById('speed').innerHTML = speed;
            document.getElementById('weatherInfo').style.display = 'block';
            document.getElementById('error').innerHTML = ''; // Сброс ошибки, если она была показана ранее
        })
        .catch(error => {
            // Показать ошибку над блоком с информацией о погоде
            document.getElementById('error').innerHTML = error.message;
            // Скрыть блок с информацией о погоде
            document.getElementById('weatherInfo').style.display = 'none';
        });
}

document.querySelector('.input_city').addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        document.getElementById('button_city').click();
    }
});
