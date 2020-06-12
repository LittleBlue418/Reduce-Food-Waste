import React from 'react';
import classes from './SearchFilters.module.css';

const SearchFilters = ({alogenFilters, toggleAlogen}) => {
  const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1)

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