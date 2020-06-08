import React from 'react';
import SearchFilters from './SearchFilters/SearchFilters';

const Search = (props) => {
  return (
    <div>
      <SearchFilters
        searchParams={props.searchParams}
        addSearchParam={props.addSearchParam}
      />
    </div>
  );
};

export default Search;