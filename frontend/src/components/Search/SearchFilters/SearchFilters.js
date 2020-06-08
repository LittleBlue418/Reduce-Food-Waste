import React from 'react';
import classes from './SearchFilters.module.css';

const SearchFilters = ({searchParams, addSearchParam}) => {
  const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1)

  const labelFromKey = (key) => capitalize(key.replace('_', ' '))

  return (
    <div className={classes.SearchFilters}>
      <form action="#">
        {
          Object.entries(searchParams).map(([key, value]) => (
          <div key={key}>
            <input type="checkbox"  checked={value} name={key} value={key} onChange={(event) => addSearchParam(key, event.target.checked)}/>
            <label>{labelFromKey(key)}</label>
          </div>))
        }
      </form>
    </div>
  );
};


export default SearchFilters;