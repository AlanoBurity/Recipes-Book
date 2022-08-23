import React from 'react';

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
