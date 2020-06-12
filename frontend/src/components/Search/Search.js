import React, { useState } from 'react';

import APIClient from '../../apiClient';

import SearchFilters from './SearchFilters/SearchFilters';
import SearchBox from './SearchBox/SearchBox';
import IngredientsChips from './IngredientsChips/IngredientsChips';

const Search = (props) => {
  const [ingredients, appendToIngredients] = useState (["potato", "mayonaise"])

  return (
    <div>
      <SearchFilters
        searchParams={props.searchParams}
        addSearchParam={props.addSearchParam}
      />

      <SearchBox

      />

      <IngredientsChips
          ingredients={ingredients}
      />
    </div>
  );
};

export default Search;