import React from 'react';
import classes from './SearchFilters.module.css';
import { labelFromKey } from '../../../utilityFunctions';

const SearchFilters = ({alogenFilters, toggleAlogen}) => {
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