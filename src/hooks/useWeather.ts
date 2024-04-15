import axios from "axios";
import { SearchType } from "../types";

const useWeather=()=>{
    
    const fetchWeather = async(search: SearchType)=>{

        const appId= import.meta.env.VITE_API_KEY
        
        try {
            const geoUrl =`http://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${appId}`
            
            const {data} = await axios.get(geoUrl)
            
            const {lat, lon} = data[0]
            
            const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`
            
            const{data: weather}= await axios(weatherUrl)

            console.log(weather);
            
            
        } catch (error) {
            console.log(error);    
        }
        
    }
    
    
    return{
        fetchWeather
    }
}

export default useWeather