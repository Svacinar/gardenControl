import React from "react";
import keys from "./keys";
import { Component } from "react";

import Axios from 'axios';
import WeatherDayCard from "../UI/WeatherDayCard/WeatherDayCard";

const api = {
  key: keys.API_KEY,
  base: keys.BASE_URL,
};

class Weather extends Component {
    constructor(props) {
        super(props)
        this.response = null;

        this.state = {
            temp: "N/A"
        }
      }


    getWeather() {
        Axios.get(`${api.base}weather?lat=50.171000&lon=15.825160&APPID=${api.key}&units=metric`)
        .then(res => {
            console.log(res.data);
            this.response = res.data
            console.log(this.response.main.temp)
            this.setState({temp: this.response.main.temp})
        })
        console.log("should fetch weather");
    }

    componentDidMount() {
        this.getWeather();
    }  
    



    render() {
        return (
            <div>
                <h1>Experimental weather component</h1>
                <WeatherDayCard temp = {this.state.temp}/>
            </div>
        )  
    }
}



export default Weather;
