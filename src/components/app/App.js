import { Component } from 'react';

import './App.sass';
import Header from '../weatherHeader/WeatherHeader';
import Main from '../weatherMain/WeatherMain';
import RenderDays from '../renderDays/RenderDays';

class App extends Component {
    state = { // Создаём начальный стейт для елементов
        cityTemp: null,
        cityName: null,
        humidity: 0,
        lvlSea: 0,
        wind: null,
        pressure: 0,
        visibility: 0,
        input: null,
    };

    updateWeatherData = (cityTemp, cityName, weatherClouds, humidity, lvlSea, wind, pressure, visibility) => { // Создали метод для обновления погоды, так как мы работали в другом компоненте, мы не могли передать переменные, поэтому мы создали метод в родительском компоненте, поместили его в Header, и там занесли в него переменные как аргументы написаные здесь, после создали начальный стейт для этих переменных, и поместили в наш новый стейт новые значение которые мы вытащили из updateWeatherData в компоненте Header, в кратце, мы создали метод чтобы поместить в него новый стейт, и в этот стейт поместить переменные которые нам нужны в другом компоненте, мы его поместили в Header как пропс-метод, и по итогу вытащили переменные, которые в render записали как this.state что дало нам возможность, достать их из Header
      this.setState({
        cityTemp: cityTemp,
        cityName: cityName,
        weatherClouds: weatherClouds,
        humidity: humidity,
        lvlSea: lvlSea,
        wind: wind,
        pressure: pressure,
        visibility: visibility
      });
    };

    updateCityCoords = (lat, lon) => { // Так же еще один метод для передачи координат lat, lon мы их передали в Header и там туда занесли их, и по итогу они появились в стейте cityLat и cityLon
        this.setState({
            cityLat: lat,
            cityLon: lon,
        });
    };

    render() {
        const { cityTemp, cityName, weatherClouds, humidity, lvlSea, wind, pressure, visibility, cityLat, cityLon } = this.state;

        return (
            <div className="App">
                    <Header updateWeatherData={this.updateWeatherData} updateCityCoords={this.updateCityCoords}></Header>
                <div className="main-wrapper">
                    <Main cityTemp={cityTemp} cityName={cityName} weatherClouds={weatherClouds} humidity={humidity} lvlSea={lvlSea} wind={wind} pressure={pressure} visibility={visibility}></Main>
                    <RenderDays cityLat={cityLat} cityLon={cityLon}></RenderDays>
                </div>
            </div>
        );
    }
}

export default App;
