import React from 'react'
import classes from './SearchFilters.module.css'
import { labelFromKey } from '../../../utilityFunctions'

const SearchFilters = ({dietaryRequirements, toggleDietaryRequirement}) => {
  return (
    <div className={classes.SearchFilters}>
      <form action="#">
        {
          Object.entries(dietaryRequirements).map(([key, value]) => (
            <div key={key}>
              <input type="checkbox"  checked={value} name={key} value={key} onChange={() => toggleDietaryRequirement(key)}/>
              <label>{labelFromKey(key)}</label>
            </div>))
        }
      </form>
    </div>
  )
}


export default SearchFilters