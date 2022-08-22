import React from 'react';

function InputSearch() {
  return (
    <form>
      <label htmlFor="search">
        Serarch
        <input
          data-testid="search-input"
          type="text"
          name="search"
        />
      </label>
    </form>
  );
}

export default InputSearch;
