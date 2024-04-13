import { countries } from "../../Data/countries"
import styles from './Form.module.css'
const Form = () => {
  return (
    <form className={styles.form}>

        <div className={styles.feild}>
            <label htmlFor="city">City:</label>
            <input 
                id="city"
                type="text"
                name="city"
                placeholder="City" 
            />
        </div>
        
        <div className={styles.feild}>
            <label htmlFor="country">Country:</label>
            <select name="country" id="country">
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