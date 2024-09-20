import { Component } from "react";

import WeatherApi from "../weatherService/WeatherService";
import "../weatherHeader/weatherHeader.sass";
import { Button } from "antd";
import { SearchOutlined } from "@ant-design/icons"; // Импорт иконки

class Header extends Component {
    state = { // Создаём начальный стейт для елементов
        input: "",
        cityLat: null,
        cityLon: null
    }

    weatherApi = new WeatherApi(); // Создаём экземпляр класса и получаем в использование его методы

    updateInputValue = (event) => { // Позволяет получить введенные данные из инпута
        const value = event.target.value;
        this.setState({
            input: value
        })
        this.getCityFromInput(value);
    }

    getCityFromInput = (value) => { // Выводим в консоль значение инпута
        console.log(value)
    }

    getCity = (e) => {
        e.preventDefault(); // Отключаем дефолтное поведение формы (перезагрузку страницы)
        const { input } = this.state;

        this.weatherApi.getCityApi(input.trim())
        .then(response => {
            return response;
        })
        .then(data => {
            const cityInfo = data;
            const cityLat = cityInfo.coord.lat; // Получаем координаты для поиска по городу погоду и для погоды на 5 дней
            const cityLon = cityInfo.coord.lon;

            // Передаем координаты города через пропсу в родительский компонент
            this.props.updateCityCoords(cityLat, cityLon); // То о чём и была речь, мы передаём в наш метод переменные для долготы и ширины теперь он будет принимать в себя эти переменные и мы сможем передать их в другой компонент из родительского

            this.setState({ // Обновили стейт и поместили туда долгоду и ширину
                cityLat: cityLat,
                cityLon: cityLon,
            }, 
            this.getWeather(cityLat, cityLon)); // Передали в наш метод по поиску погоды, ширину и долготу

        })
        .catch(error => {
            console.error("Ошибка при запросе данных о городе:", error);
        });
        if (input.trim()) { // Очищаем инпут после отправки
            this.setState({
                input: ''
            })
        }
    }

    getWeather = (lat, lon) => {

        this.weatherApi.getWeatherApi(lat, lon)
        .then(response => {
            return response
        })
        .then(data => {
            console.log(data)
            const weatherInfo = data;

            // Получили в переменные динамические данные о температура, названии города, облачности и другой информации
            const cityTemp = weatherInfo.main.temp;
            const cityName = weatherInfo.name;
            const weatherClouds = weatherInfo.weather[0].main;
            const humidity = weatherInfo.main.humidity;
            const lvlSea = weatherInfo.main.sea_level;
            const wind = weatherInfo.wind.speed;
            const pressure = weatherInfo.main.pressure;
            const visibility = weatherInfo.visibility;

            this.props.updateWeatherData(cityTemp, cityName, weatherClouds, humidity, lvlSea, wind, pressure, visibility);
        })
        .catch(error => {
            console.error("Ошибка при запросе погоды:", error);
        });
    }

    render () {
        const { input } = this.state; // Значение инпута вытащили из обновленного стейта

        return (
                <div className="header">
                    <h1 className="header-title">Прогноз погоды</h1>
                    <div className="header-block">
                        <form onSubmit={(e) => this.getCity(e)}>
                        <input placeholder="Введите название города" type="text" className="header-block__input" value={input} onChange={(e) => this.updateInputValue(e)}/>
                        <Button htmlType="submit"  type="primary" disabled={!this.state.input} className="header-block__button" icon={<SearchOutlined />}>
                            Показать
                        </Button>
                        </form>
                    </div>
                </div>
        )
    }
}

export default Header;