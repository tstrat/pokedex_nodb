import React, { Component } from "react"
import axios from 'axios';

import '../style/weather.css';
class Weather extends Component {
    constructor() {
        super()
        this.url = 'https://api.openweathermap.org/data/2.5/weather?'
        this.apikey= '&APPID=b51570e0f8df0edec58a69465b848a1b';
        this.iconUrl = 'http://openweathermap.org/img/w/';

        this.state = {
            input : '',
            icon : '',
            weatherDesc: '',
        }
    }


    getWeather= (e) => {
        axios.get(this.url + `q=${this.state.input}${this.apikey}`)
        .then(res => {
            console.log(res.data.weather);
            this.setState({
                icon: res.data.weather[0].icon,
                weatherDesc: res.data.weather[0].description
            })

        })
    }

    updateInput = (e) => this.setState({input: e.target.value});
    

    render() {
        const message = "GO PLAY POKEMON! RAIN SUN SNOW OR HAIL!";
        return (
            <div className="weather">
                <div>
                <h1> --- WEATHER APP ---</h1>
                <input value={this.state.input} placeholder="Enter your city name ... " onChange={this.updateInput}></input>
                <button onClick={this.getWeather}>Find your weather</button>
                {(this.state.weatherDesc)
                    ?
                    <div className="results">
                        <h2>{this.state.weatherDesc}</h2>
                        <img src={this.state.icon ? this.iconUrl + this.state.icon + ".png" : ""} alt="weather icon"/>
                        <h3>{message}</h3>
                    </div>
                    :
                    <div></div>
                }
                </div>
            </div>
    )}
}

export default Weather;