import { useState, useEffect } from "react";

import '../renderDays/renderDays.sass'
import WeatherApi from "../weatherService/WeatherService";
import { motion } from 'framer-motion';

// Импорт иконок
import { WiWindBeaufort11 } from 'react-icons/wi';
import { CiDroplet } from "react-icons/ci";

// Импорт фоток
import cloudyImg from '../../img/card_cloudy.png'
import sunnyImg from '../../img/card_sunny.png'
import rainImg from '../../img/card_rain.png'
import clearImg from '../../img/card_clear.png'

const RenderDays = ({cityLat, cityLon}) => {
    const [weatherInfo, setWeatherInfo] = useState([])

    useEffect(() => {
        getWeek(cityLat || null, cityLon || null); 
    }, [])

    useEffect(() => {
        if (cityLat || cityLon) {
            getWeek(cityLat, cityLon);
        }
    }, [cityLat, cityLon])

    const weatherApi = new WeatherApi(); // Создали экземпляр класса

    const getWeek = (lat, lon) => {
        setWeatherInfo([])

        weatherApi
        .getWeatherWeekApi(lat, lon)
        .then(response => {
            console.log(response)
            return response
        })
        .then(data => {
            const weatherInfo = data;
            console.log(weatherInfo)
            console.log(weatherInfo.list[0].weather[0].main)
            
            setTimeout(() => {
                setWeatherInfo(data.list)
            }, 3500);
        })
        .catch(error => {
            console.error("Ошибка при запросе погоды на неделю:", error);
        });
    }

    const getWeatherImage = (weatherClouds) => { // Метод для перебора картинки
        switch (weatherClouds) {
            case 'Clouds':
                return cloudyImg;
            case 'Rain':
                return rainImg;
            case 'Clear':
                return clearImg;
            case 'Sunny':
                return sunnyImg;
            default:
                return cloudyImg; // Default image if no match
        }
    }

    const getDayOfWeek = (date) => { // Метод для подсчёта дня по времени
        const daysOfWeek = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
        const dayIndex = new Date(date * 1000).getDay(); // Преобразуем Unix timestamp в дату
        return daysOfWeek[dayIndex];
    }

        const styleOne = {
            fontSize: '30px'
        }

        const styleTwo = {
            fontSize: '40px'
        }

        // Анимация для блоков
        const blockAnimation = {
            hidden: { opacity: 0, y: 20 }, // Начальное состояние
            visible: { opacity: 1, y: 0 }, // Конечное состояние
            transition: {
                ease: "linear",
                duration: 2,
                x: { duration: 1 }
            }
        };

        console.log(weatherInfo)

        return (
            <div className="renderDays">

        {weatherInfo.length > 0 && weatherInfo // Создали тернарного оператора, который фильтрует наш массив weatherInfo(data.list), в фильтре мы ставим первый прочерк так как нам не нужен первый аргумент, вместо этого можно поставить прочерк, указываем нулевой массив это первый день, 
            .filter((_, index) => [0, 8, 16, 24, 32, 40].includes(index))
            .map((day, index) => {
                const weatherCondition = day.weather[0].main;
                const dayOfWeek = getDayOfWeek(day.dt)
                return (
                        <motion.div
                            className="renderDays-block"
                            key={index}
                            initial="hidden"
                            animate="visible"
                            variants={blockAnimation}
                        >
                        <h5 className="renderDays-block__day">{dayOfWeek}</h5>
                            <img src={getWeatherImage(weatherCondition)} alt="" className="renderDays-block__img" />
                        <div className="renderDays-block__nums">
                            <h1 className="renderDays-block__num">{Math.round(day.main.temp_max).toFixed(0)}°C</h1>
                            <h1 className="renderDays-block__num">{Math.round(day.main.temp_min).toFixed(0)}°C</h1>
                        </div>
                        <div className="render-wrap">
                            <div className="div-render">
                                <CiDroplet style={styleOne} />
                                <p className="renderDays-block__humidity">{day.main.humidity}%</p>
                            </div>
                            <div className="div-render">
                                <WiWindBeaufort11 style={styleTwo} />
                                <p className="renderDays-block__wind">{day.wind.speed} км/час</p>
                            </div>
                        </div>
                    </motion.div>
                );
            })}
            </div>
        )
}

export default RenderDays;