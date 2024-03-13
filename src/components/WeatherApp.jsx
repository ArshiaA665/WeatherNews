import React, { useEffect, useState } from 'react';
import search_icon from '../assets/search.png';
import clear_icon from '../assets/clear.png';
import cloud_icon from '../assets/cloud.png';
import drizzle_icon from '../assets/drizzle.png';
import rain_icon from '../assets/rain.png';
import snow_icon from '../assets/snow.png';
import wind_icon from '../assets/wind.png';
import humidity_icon from '../assets/humidity.png';
import { fadeIn } from '../../variants';
import { motion } from "framer-motion";
import  Toggles  from './Toggles';

const WeatherApp = () => {
    let api_key = "your api key";

    const [wicon,setWicon] = useState(cloud_icon);

    const search = async () => {
        const element = document.getElementsByClassName("cityInput")
        if(element[0].value==="")
        {
            return 0;
        }
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;
        
        let response = await fetch(url);
        let data = await response.json();
        
        const humidity = document.getElementsByClassName("humidity-percent");
        const wind = document.getElementsByClassName("wind-speed");
        const temp = document.getElementsByClassName("weather-temp");
        const location = document.getElementsByClassName("weather-location");
    
        humidity[0].innerHTML = data.main.humidity+"%";
        wind[0].innerHTML = Math.floor(data.wind.speed)+"km/h";
        temp[0].innerHTML = Math.floor(data.main.temp)+"°";
        location[0].innerHTML = data.name;
        
        if(data.weather[0].icon==="01d" || data.weather[0].icon==="01n")
        {
            setWicon(clear_icon);
        }

        else if((data.weather[0].icon==="02d" || data.weather[0].icon==="02n"))
        {
            setWicon(cloud_icon);
        }
        else if((data.weather[0].icon==="04d" || data.weather[0].icon==="04n"))
        {
            setWicon(drizzle_icon);
        }
        else if((data.weather[0].icon==="09d" || data.weather[0].icon==="09n"))
        {
            setWicon(rain_icon);
        }
        else if((data.weather[0].icon==="10d" || data.weather[0].icon==="10n"))
        {
            setWicon(rain_icon);
        }
        else if((data.weather[0].icon==="13d" || data.weather[0].icon==="13n"))
        {
            setWicon(snow_icon);
        }

        else 
        {
            setWicon(clear_icon);
        }
    
    }
    onload=function(){
    var input = document.getElementById("myInput");
// Execute a function when the user presses a key on the keyboard
    input.addEventListener("keyup", function(event) {
  // If the user presses the "Enter" key on the keyboard
        if (event.keyCode === 13 || event.keyCode === 10) {
    // Cancel the default action, if needed
        event.preventDefault();
    // Trigger the button element with a click
        document.getElementById("pressKey").click();
        }
    });
    }
  
    const [isDark, setIsDark] = useState(true);
  return (
    <div className=' weather-container overflow-hidden flex flex-col fixed min-w-[300px]'
        data-theme={isDark ? "dark" : "light"}>
        <Toggles
            isChecked={isDark}
            handleChange={() => setIsDark(!isDark)}/>
        <div className='flex justify-center gap-[14px] pt-[30px]'>
            <input 
                type="text" 
                className=" cityInput flex sm:w-[300px] sm:h-[70px]
                     w-[150px] h-[40px] bg-li-white border-none outline-none
                    rounded-[40px] sm:pl-[40px] pl-[20px] text-li-grey
                    sm:text-[20px] text-[15px] font-normal"
                id='myInput'
                placeholder='search'/>

            <button type='submit' className='flex justify-center items-center
                sm:w-[70px] sm:h-[70px] w-[40px] h-[40px] bg-li-white rounded-[40px] cursor-pointer'
                onClick={()=>{search()}}
                id='pressKey'>
                <img src={search_icon} alt="search_icon" />
            </button>
        </div>

        <motion.div 
        variants={fadeIn('right', 0.3)} 
        initial="hidden"
        whileInView={'show'}
        className='mt-[29px] flex justify-center'>
            <img
            className='sm:w-[200px] sm:h-[200px] w-[150px] h-[150px] sm:mt-0 mt-4' 
            src={wicon} 
            alt="" />
        </motion.div>

        <motion.div 
        variants={fadeIn('up', 0.3)} 
        initial="hidden"
        whileInView={'show'}
        className='weather-temp flex justify-center text-white
            sm:text-[85px] text-[60px] font-normal sm:mt-0 mt-5'>0°
        </motion.div>

        <motion.div 
        variants={fadeIn('up', 0.3)} 
        initial="hidden"
        whileInView={'show'}
        className=' weather-location flex justify-center text-white
            sm:text-[55px] text-[40px] font-normal sm:mt-0 mt-5'>Search City
        </motion.div>

        <div className='text-white flex justify-center items-center sm:mt-0 mt-[100px]'>
            <motion.div 
            variants={fadeIn('right', 0.3)} 
            initial="hidden"
            whileInView={'show'}
            className='m-auto flex justify-start gap-[12px]'>
                <img 
                    src={humidity_icon} 
                    alt="humidity"
                    className='w-[100%] h-[100%]' />

                <div className='sm:text-[34px] text-[25px] font-normal'>
                    <div className='humidity-percent'>0%</div>
                </div>
            </motion.div>
            <motion.div 
            variants={fadeIn('left', 0.3)} 
            initial="hidden"
            whileInView={'show'}
            className='m-auto flex justify-start gap-[12px]'>
                <img 
                    src={wind_icon} 
                    alt="wind" 
                    className='w-[100%] h-[100%]' />

                <div className='sm:text-[34px] text-[25px] font-normal'>
                    <div className='wind-speed'>0km/h</div>
                </div>
            </motion.div>
        </div>
    </div>
  )
}

export default WeatherApp
