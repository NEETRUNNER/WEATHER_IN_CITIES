import { useState } from "react";

import WeatherApi from "../weatherService/WeatherService";
import "../weatherHeader/weatherHeader.sass";
import { Button } from "antd";
import { SearchOutlined } from "@ant-design/icons"; // Импорт иконки

const Header = ({updateCityCoords, updateWeatherData}) => {

    const [input, setInput] = useState('');
    const [cityLat, setCityLat] = useState(null);
    const [cityLon, setCityLon] = useState(null);

    const weatherApi = new WeatherApi(); // Создаём экземпляр класса и получаем в использование его методы

    const updateInputValue = (event) => { // Позволяет получить введенные данные из инпута
        const value = event.target.value;
        setInput(value)
        getCityFromInput(value);
    }

    const getCityFromInput = (value) => { // Выводим в консоль значение инпута
        console.log(value)
    }

    const getCity = (e) => {
        e.preventDefault(); // Отключаем дефолтное поведение формы (перезагрузку страницы)

        weatherApi.getCityApi(input.trim())
        .then(response => {
            return response;
        })
        .then(data => {
            const cityInfo = data;
            const cityLat = cityInfo.coord.lat; // Получаем координаты для поиска по городу погоду и для погоды на 5 дней
            const cityLon = cityInfo.coord.lon;

            // Передаем координаты города через пропсу в родительский компонент
            updateCityCoords(cityLat, cityLon); // То о чём и была речь, мы передаём в наш метод переменные для долготы и ширины теперь он будет принимать в себя эти переменные и мы сможем передать их в другой компонент из родительского

            setCityLat(cityLat)
            setCityLon(cityLon)

            getWeather(cityLat, cityLon) // Передали в наш метод по поиску погоды, ширину и долготу
        })
            .catch(error => {
                console.error("Ошибка при запросе данных о городе:", error);
            });
            if (input.trim()) { // Очищаем инпут после отправки
                setInput('')
            }
    }

    const getWeather = (lat, lon) => {

        weatherApi.getWeatherApi(lat, lon)
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

            updateWeatherData(cityTemp, cityName, weatherClouds, humidity, lvlSea, wind, pressure, visibility);
        })
        .catch(error => {
            console.error("Ошибка при запросе погоды:", error);
        });
    }

        return (
                <div className="header">
                    <h1 className="header-title">Прогноз погоды</h1>
                    <div className="header-block">
                        <form onSubmit={(e) => getCity(e)}>
                        <input placeholder="Введите название города" type="text" className="header-block__input" value={input} onChange={(e) => updateInputValue(e)}/>
                        <Button htmlType="submit"  type="primary" disabled={!input} className="header-block__button" icon={<SearchOutlined />}>
                            Показать
                        </Button>
                        </form>
                    </div>
                </div>
        )
}

export default Header;