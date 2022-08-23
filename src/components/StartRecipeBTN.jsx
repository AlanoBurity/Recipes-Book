import React from 'react';
import '../App.css';

function StartRecipeBTN() {
  return (
    <div>
      <button
        type="button"
        data-testid="start-recipe-btn"
        onClick={ () => handle() }
      >
        Start Recipe

      </button>
    </div>
  );
}

export default StartRecipeBTN;
