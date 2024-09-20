import { Component } from 'react';

// Получили картинки
import cloudyImg from '../../img/cloudy.png';
import stormImg from '../../img/storm.png';
import sunnyImg from '../../img/sunny.png';
import rainImg from '../../img/rain.png';
import clearImg from '../../img/clearSky.png';
import './weatherMain.sass';

// Иконки из библиотеки
import { WiThermometer } from 'react-icons/wi';
import { WiWindBeaufort11 } from 'react-icons/wi';
import { motion } from 'framer-motion';
import { FaEye } from 'react-icons/fa';
import { FaDroplet } from 'react-icons/fa6';
import { FaTachometerAlt } from 'react-icons/fa';
import { TiWaves } from 'react-icons/ti';

// Спиннер
import { Hourglass } from 'react-loader-spinner';

class Main extends Component {
    state = { // Создаём начальный стейт для елементов
        loading: false,
    };

    getWeatherImage(weatherClouds) { // Метод который будет подставлять картинку в зависимости от того что мы получим в weatherClouds(облачность)
        switch (weatherClouds) {
            case 'Clouds':
                return cloudyImg;
            case 'Rain':
                return rainImg;
            case 'Storm':
                return stormImg;
            case 'Clear':
                return clearImg;
            case 'Sunny':
                return sunnyImg;
            default:
                return cloudyImg; // Default image if no match
        }
    }

    componentDidUpdate(prevProps) { // Хук проверяет есть ли какие-то изменения с прошлого стейта, прошлый стейт у нас null и мы сравниваем его, с текущем стейтом, например вбили город Днепр, в стейт записалось это значения, и после мы вводим новое, и получаем сравнение города Днепр с например городом Киев, и так у нас меняется стейт спиннера, когда мы вбиваем другой город, он переводится в false, после получения нового города проходит интервал и он переводится в true
        if (
            prevProps.cityName !== this.props.cityName ||
            prevProps.cityTemp !== this.props.cityTemp
        ) {
            console.log(prevProps.cityName)
            console.log(this.props.cityName)
            // Снова показываем спиннер при обновлении данных
            this.setState({ loading: true });

            // Имитация загрузки данных (например, запрос API)
            setTimeout(() => {
                this.setState({ loading: false });
            }, 2500); // Можно заменить на реальный запрос данных
        }
    }

    render() {

        const {
            cityName,
            cityTemp,
            weatherClouds,
            humidity,
            lvlSea,
            wind,
            pressure,
            visibility,
        } = this.props;
    
        const { loading } = this.state;
        console.log(loading)

        const content = !loading ? <RenderCard cityTemp={cityTemp} cityName={cityName} weatherClouds={weatherClouds} getWeatherImage={this.getWeatherImage} humidity={humidity} lvlSea={lvlSea} wind={wind} pressure={pressure} visibility={visibility}></RenderCard> : null;
        const spinner = loading ? <LoadSpinner></LoadSpinner> : null;

        return (
            <>
                {content}
                {spinner}
            </>
        );
    }
}

const RenderCard = ({cityTemp, cityName, weatherClouds, getWeatherImage, humidity, lvlSea, wind, pressure, visibility}) => { // Метод который рендерит карточку и доп. информацию

    const mathTemp = Math.round(cityTemp).toFixed(0);
    const windTemp = Math.round(wind).toFixed(0);
    const weatherImage = getWeatherImage(weatherClouds);

    const styleIcon = {
        fontSize: '25px',
    };

    const style = {
        color: 'rgb(0, 0, 0)',
        fontFamily: 'Rubik',
        fontSize: '92px',
        fontWeight: 500,
        lineHeight: '33px',
        letterSpacing: '0%',
        marginTop: '20px',
        marginBottom: '20px',
    };

    // Анимационные настройки
    const blockAnimation = {
        initial: { opacity: 0, y: 50 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5, type: 'spring', stiffness: 50 },
        whileHover: { scale: 1.1 },
    };

    return (
        <div className="main">
        <div className="main-card">
            <div className="main-card__left">
                <h5 className="main-card__title">
                    {cityName ? cityName : 'Ваш город'}
                </h5>
                <h1 style={style} className="main-card__number">
                    {mathTemp ? mathTemp + '°c' : '11°c'}
                </h1>
                <h4 className="main-card__weather">
                    {weatherClouds ? weatherClouds : 'Clouds'}
                </h4>
            </div>
            <div className="main-card__right">
                <motion.img
                    src={weatherImage}
                    alt=""
                    className="main-card__img"
                    key={weatherImage}
                    initial={{ scale: 0 }}
                    animate={{ rotate: 0, scale: 1 }}
                    transition={{
                        type: 'spring',
                        stiffness: 260,
                        damping: 20,
                    }}
                />
            </div>
            </div>
                <div className="main-info">
                    <motion.div
                        className="main-info__block"
                        key={`temp-${cityTemp}`}
                        {...blockAnimation}
                    >
                        <WiThermometer style={styleIcon}></WiThermometer>
                        <div className="main-info__div">
                            <div className="main-info__title">Ощущается</div>
                            <div className="main-info__num">
                                {mathTemp ? mathTemp : 0} °c
                            </div>
                        </div>
                    </motion.div>
                    <motion.div
                        className="main-info__block"
                        key={`wind-${wind}`}
                        {...blockAnimation}
                    >
                        <WiWindBeaufort11 style={styleIcon}></WiWindBeaufort11>
                        <div className="main-info__div">
                            <div className="main-info__title">Ветер</div>
                            <div className="main-info__num">
                                {windTemp ? windTemp : 0} км/час
                            </div>
                        </div>
                    </motion.div>
                    <motion.div
                        className="main-info__block"
                        key={`humidity-${humidity}`}
                        {...blockAnimation}
                    >
                        <FaDroplet style={styleIcon}></FaDroplet>
                        <div className="main-info__div">
                            <div className="main-info__title">Влажность</div>
                            <div className="main-info__num">{humidity} %</div>
                        </div>
                    </motion.div>
                    <motion.div
                        className="main-info__block"
                        key={`visibility-${visibility}`}
                        {...blockAnimation}
                    >
                        <FaEye style={styleIcon} />
                        <div className="main-info__div">
                            <div className="main-info__title">Видимость</div>
                            <div className="main-info__num">
                                {visibility} км
                            </div>
                        </div>
                    </motion.div>
                    <motion.div
                        className="main-info__block"
                        key={`pressure-${pressure}`}
                        {...blockAnimation}
                    >
                        <FaTachometerAlt style={styleIcon}></FaTachometerAlt>
                        <div className="main-info__div">
                            <div className="main-info__title">Давление</div>
                            <div className="main-info__num">{pressure} мб</div>
                        </div>
                    </motion.div>
                    <motion.div
                        className="main-info__block"
                        key={`lvlSea-${lvlSea}`}
                        {...blockAnimation}
                    >
                        <TiWaves style={styleIcon} />
                        <div className="main-info__div">
                            <div className="main-info__title">Уровень моря</div>
                            <div className="main-info__num">{lvlSea}</div>
                        </div>
                    </motion.div>
                </div>
            </div>
    )
    
};

const LoadSpinner = () => { // Функция-метод которая создаёт компонент спиннера
    const style = {
        position: 'relative',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, 100%)'
    }

    return (
            <div style={style} className="spinner-container">
                <Hourglass
                visible={true}
                height="160"
                width="160"
                ariaLabel="hourglass-loading"
                wrapperStyle={{}}
                wrapperClass=""
                colors={['#306cce', '#72a1ed']}
                />
            </div>
    );
};

export default Main;