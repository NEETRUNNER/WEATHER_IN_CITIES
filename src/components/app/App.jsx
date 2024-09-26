import { useState } from 'react';

import './App.sass';
import Header from '../weatherHeader/WeatherHeader';
import Main from '../weatherMain/WeatherMain';
import RenderDays from '../renderDays/RenderDays';

const App = () => {
    // Создаём начальный стейт для элементов
    const [cityTemp, setCityTemp] = useState(null);
    const [cityName, setCityName] = useState(null);
    const [humidity, setHumidity] = useState(0);
    const [lvlSea, setLvlSea] = useState(0);
    const [wind, setWind] = useState(null);
    const [pressure, setPressure] = useState(0);
    const [visibility, setVisibility] = useState(0);
    const [cityLat, setCityLat] = useState(null);
    const [cityLon, setCityLon] = useState(null);
    const [weatherClouds, setWeatherClouds] = useState(null)

    const updateWeatherData = (cityTemp, cityName, weatherClouds, humidity, lvlSea, wind, pressure, visibility) => {
        // Метод для обновления данных о погоде
        setCityTemp(cityTemp);
        setCityName(cityName);
        setHumidity(humidity);
        setLvlSea(lvlSea);
        setWind(wind);
        setPressure(pressure);
        setVisibility(visibility);
        setWeatherClouds(weatherClouds)
        // Если вам нужно сохранить weatherClouds, добавьте отдельный стейт
    };

    const updateCityCoords = (lat, lon) => {
        // Метод для обновления координат
        setCityLat(lat);
        setCityLon(lon);
    };

        return (
            <div className="App">
                    <Header updateWeatherData={updateWeatherData} updateCityCoords={updateCityCoords}></Header>
                <div className="main-wrapper">
                    <Main cityTemp={cityTemp} cityName={cityName} weatherClouds={weatherClouds} humidity={humidity} lvlSea={lvlSea} wind={wind} pressure={pressure} visibility={visibility}></Main>
                    <RenderDays cityLat={cityLat} cityLon={cityLon}></RenderDays>
                </div>
            </div>
        );
}


export default App;