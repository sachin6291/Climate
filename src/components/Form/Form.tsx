import { ChangeEvent, FormEvent, useState } from "react"
import { countries } from "../../Data/countries"
import styles from './Form.module.css'
import type { SearchType } from "../../types"
import Alert from "../Alert/Alert"

type FormProp={
    fetchWeather: (search: SearchType) => Promise<void>
}

const Form = ({fetchWeather} : FormProp) => {


    const [search, setSearch]= useState<SearchType>({
        city:'',
        country:''
    })

    const[alert, setAlert]= useState('')


    const handleChange=(e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>)=>{
        setSearch({
            ...search,
            [e.target.name]: e.target.value
        })
    }


    const handleSubmit =(e: FormEvent<HTMLFormElement>)=>{
        
        e.preventDefault()

        if (Object.values(search).includes('')){
           setAlert('All Feilds are Required')
            return
        }

        fetchWeather(search)
    }



  return (
    <form className={styles.form} onSubmit={handleSubmit}>

        {alert && <Alert>{alert}</Alert>}

        <div className={styles.feild}>
            <label htmlFor="city">City:</label>
            <input 
                id="city"
                type="text"
                name="city"
                placeholder="City"
                value={search.city}
                onChange={handleChange} 
            />
        </div>
        
        <div className={styles.feild}>
            <label htmlFor="country">Country:</label>

            <select name="country" id="country" value={search.country} onChange={handleChange}>
                <option value="">-- Select a Country --</option>
                {countries.map(country=>(
                    <option
                        key={country.code}
                        value={country.code}
                    >{country.name}</option>
                ))}
            </select>
        </div>
        <input className={styles.submit} type="submit" value="Check Weather"/>
    </form>
  )
}

export default Form