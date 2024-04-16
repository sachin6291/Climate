import axios from "axios";
import {z} from "zod"
// import { object, string, number, Output, parse }from "valibot"
import { SearchType } from "../types";
import { useMemo, useState } from "react";



//ZOD
const Weather = z.object({
    name: z.string(),
    main: z.object({
        temp: z.number(),
        temp_max: z.number(),
        temp_min: z.number(),
    })
})
export type Weather = z.infer<typeof Weather>

//VALIBOT
// const WeatherSchema= object({
//     name: string(),
//     main: object({
//         temp: number(),
//         temp_max: number(),
//         temp_min: number()
//     })
// })
// type Weather= Output<typeof WeatherSchema>

const initialState={
    name:'',
    main:{
        temp: 0,
        temp_max: 0,
        temp_min: 0,
    }
}

const useWeather=()=>{
    
    const[weather, setWeather]= useState<Weather>(initialState)

    const [loading, setLoading]= useState(false)

    const [notFound, setNotFound]= useState(false)

    const fetchWeather = async(search: SearchType)=>{

        const appId= import.meta.env.VITE_API_KEY
        
        setLoading(true)
        setWeather(initialState)
        setNotFound(false)

        try {
            const geoUrl =`https://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${appId}`
            
            const {data} = await axios.get(geoUrl)

            if(!data[0]){
                setNotFound(true)
                return
            }
            
            const {lat, lon} = data[0]
            
            const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`
            
            const{data: weatherInfo}= await axios(weatherUrl)

            //ZOD
            const result = Weather.safeParse(weatherInfo)
            if(result.success){
                setWeather(result.data);
            }else{
                console.log('error in the type');                
            }
            

            //VALIBOT
            // const result = parse(WeatherSchema, weatherInfo)
            // if(result){
            //     console.log(result.name)
            //     console.log(result.main.temp)
            // }else{
            //     console.log('error in the type');                
            // }
            
            
        } catch (error) {
            console.log(error);    
        }finally{
            setLoading(false)
        }
        
    }
    
    const hasWeatherData = useMemo(()=>weather.name, [weather])
    
    return{
        weather,
        loading,
        notFound,
        fetchWeather,
        hasWeatherData
    }
}

export default useWeather