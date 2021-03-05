import React, { useState } from 'react';

import './weather.css';

import Conditions from '../conditions';

import { Link } from 'react-router-dom';

const Weather = () => {

    let [city, setCity] = useState('Samara');
    let [unit, setUnit] = useState('metric');
    let [responseObj, setResponseObj] = useState({});
    let [error, setError] = useState(false);
    let [loading, setLoading] = useState(false);

    function getForecast(e) {
        e.preventDefault();
        if (city.length === 0) {
            return setError(true);
        }

        setError(false);
        setResponseObj({});
        setLoading(true);

        const uriEncodedCity = encodeURIComponent(city);
        fetch(`https://community-open-weather-map.p.rapidapi.com/weather?units=${unit}&q=${uriEncodedCity}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "154ebef6a9mshb11ff1d27d0c2afp1b1d6bjsnd932d4894ce0",
                "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com"
            }
        })
        .then(response => response.json())
        .then(response => {
            if (response.cod !== 200) {
                throw new Error()
            }
            setResponseObj(response);
            setLoading(false);
        })
        .catch(err => {
            setError(true);
            setLoading(false);
            console.log(err.message);
        });
    }

    return (
        <div className='page-weather'>
            <div className='page-header'>
                <div className='page-main'>
                    <h1>Show Current Weather Conditions</h1>
                    <div>
                        <Link to='/' >
                            <i className="fas fa-step-backward link">Go to the main page</i>
                        </Link>
                    </div>
                        <form onSubmit={getForecast}>
                            <input className='textInput'
                                type="text"
                                placeholder="Enter City"
                                maxLength="50"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                            <label className='radio'>
                                <input className='textInput'
                                    type="radio"
                                    name="units"
                                    checked={unit === "imperial"}
                                    value="imperial"
                                    onChange={(e) => setUnit(e.target.value)}
                                />
                                Fahrenheit
                            </label>
                            <label className='radio'>
                                <input className='textInput'
                                    type="radio"
                                    name="units"
                                    checked={unit === "metric"}
                                    value="metric"
                                    onChange={(e) => setUnit(e.target.value)}
                                />
                                Celcius
                            </label>
                            <button className='button' type="submit">Get Forecast</button>
                            </form>
                    <Conditions
                    responseObj={responseObj}
                    error={error}
                    loading={loading}
                    />
                </div>
            </div>
        </div>
    );
}


export default Weather;
