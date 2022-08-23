import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import copy from 'copy-to-clipboard';
import context from '../context/Context';
import shareIcon from '../images/shareIcon.svg';

function HorizontalCard() {
  const { copyText, setCopyText } = useContext(context);
  const history = useHistory();
  // console.log(history.location.pathname);

  const handleCopyUrl = () => {
    setCopyText(history.location.pathname);
    //  console.log(copyText);
    copy(copyText);
    alert(`You have copied "${copyText}"`);
  };

  return (
    <div>
      <button
        type="button"
        onClick={ () => history.push('/detailsrecipes') }

      >
        <img
          src="ims"
          alt="asd"
          data-testid="horizontal-image0-horizontal-image"
        />
      </button>
      <p
        data-testid="horizontal-top-text"
      >
        categorieText
      </p>
      <button
        type="button"
        data-testid="horizontal-name"
        onClick={ () => history.push('/detailsrecipes') }
      >
        recipeName
      </button>
      <p
        data-testid="horizontal-done-date"
      >
        recipeDate
      </p>
      <button
        type="button"
        data-testid="horizontal-share-btn"
        onClick={ () => handleCopyUrl() }
      >
        <img
          data-testid="search-top-btn"
          src={ shareIcon }
          alt="shareIcon"
        />
      </button>
      <span data-testid="horizontal-tag">
        tag
      </span>
    </div>
  );
}

export default HorizontalCard;
