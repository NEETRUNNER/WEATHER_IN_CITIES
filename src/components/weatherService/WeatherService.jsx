class WeatherApi {

    _apiKey = '403a46430b72cd84dcf1d87acffaeeed';

    getCityApi = async (name) => {
        const geoUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${this._apiKey}&lang=ru`
        try {
            return fetch(geoUrl)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                console.log(response)
                return response.json();
                
            })
            .catch((error) => {
                console.log(error)
            });
        } catch (error) {
            console.log(error.name)
        } finally {
            console.log(geoUrl)
        }
    }

    getWeatherApi = async (lat, lon) => {
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${this._apiKey}&lang=ru`
        try {
            return fetch(weatherUrl)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                console.log(response)
                return response.json();
            })
            .catch((error) => {
                console.log(error)
            });
        } catch (error) {
            console.log(error.name)
        }
        console.log(weatherUrl)
    }

    getWeatherWeekApi = async (lat, lon) => {
        console.log(lat)
        console.log(lon)
        const weekUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&cnt=40&appid=${this._apiKey}&lang=ru`
        try {
            return fetch(weekUrl)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                console.log(response)
                return response.json();
                
            })
            .catch((error) => {
                console.log(error)
            });
        } catch (error) {
            console.log(error.name)
        } finally {
            console.log(weekUrl)
        }
    }

}

export default WeatherApi;