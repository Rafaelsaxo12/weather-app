import React, { useRef, useState } from 'react'
import './styles/weatherCard.css'

const WeatherCard = ({weather, temp, onSearch}) => {
    
    const [isCel, setIsCel] = useState(true)
    const [city, setCity] = useState('')
    const textInput = useRef()
    
    const handleTemp = () => {
        setIsCel(!isCel)
    }
      const handleSubmit = (event) => {
        event.preventDefault();
        onSearch(city.trim().toLowerCase())
        setCity('')
        textInput.current.value = ''
    }

    const handleChangeCity = (event) => {
       setCity(event.target.value)
    }

  return (
    <div className='weathercard'>
        <h1 className='weathercard__title'>Weather App</h1>
        <h2 className='weathercard__city'>{weather?.name}, {weather?.sys.country}</h2>
        <section className='weathercard__body'>
            <figure className='weathercard__icon'>
                <img src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}@4x.png`}alt="weather image" />
            </figure>
            <article className='weathercard__data'>
                <h3 className='weathercard__description'>"{weather?.weather[0].description}"</h3>
                <ul className='weathercard__list'>
                    <li className='weathercard__item'><span>Wind speed</span><span>{weather?.wind.speed}m/s</span></li>
                    <li className='weathercard__item'><span>Clouds</span><span>{weather?.clouds.all}%</span></li>
                    <li className='weathercard__item'><span>Pressure</span><span>{weather?.main.pressure}hPa</span></li>
                </ul>
            </article>
        </section>
        <h2>
            {
             isCel ? 
                temp?.cel + ' ℃' 
                :
                temp?.fah + ' ℉'
            }
        </h2>
        <div className='buttons'>
          <button onClick={handleTemp}>change to {isCel ? ' ℉' : ' ℃'}</button>

          <form onSubmit={handleSubmit} className='searchCountry'>
            <input 
              ref={textInput} 
              value={city}
              onChange={handleChangeCity} 
              placeholder='Search a city' 
              type="text" 
            />
            <button>Search</button>
          </form>
        </div>
    </div>
  )
}

export default WeatherCard