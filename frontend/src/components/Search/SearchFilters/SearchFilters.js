import React from 'react';
import classes from './SearchFilters.module.css';
import { capitalize } from '../../../utilityFunctions';

const SearchFilters = ({alogenFilters, toggleAlogen}) => {
  const labelFromKey = (key) => capitalize(key.replace('_', ' '))

  return (
    <div className={classes.SearchFilters}>
      <form action="#">
        {
          Object.entries(alogenFilters).map(([key, value]) => (
          <div key={key}>
            <input type="checkbox"  checked={value} name={key} value={key} onChange={() => toggleAlogen(key)}/>
            <label>{labelFromKey(key)}</label>
          </div>))
        }
      </form>
    </div>
  );
};


export default SearchFilters;