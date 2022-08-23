import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import iconePerfil from '../images/profileIcon.svg';
import iconeSearch from '../images/searchIcon.svg';
import context from '../context/Context';
import '../styles/Header.css';

function Header({ titulo, searchInput }) {
  const { setSearchBtn } = useContext(context);
  const history = useHistory();
  // console.log(history);
  return (
    <header className="container-header">
      <div>
        <button
          data-testid="profile"
          type="button"
          onClick={ () => history.push('/profile') }
        >
          <img
            data-testid="profile-top-btn"
            src={ iconePerfil }
            alt="profile"
          />
        </button>
      </div>
      <h1
        data-testid="page-title"
      >
        { titulo }
      </h1>
      { searchInput && (
        // Referencia Stackoverflow https://stackoverflow-com.translate.goog/questions/47839856/image-onclick-failing-in-react?_x_tr_sl=en&_x_tr_tl=pt&_x_tr_hl=pt-BR&_x_tr_pto=sc
        <div>
          <button
            data-testid="search"
            type="button"
            onClick={ () => setSearchBtn((prevState) => !prevState) }
          >
            <img
              data-testid="search-top-btn"
              src={ iconeSearch }
              alt="search"
            />

          </button>
        </div>)}
    </header>
  );
}

Header.propTypes = {
  titulo: PropTypes.string.isRequired,
  searchInput: PropTypes.bool.isRequired,
};
export default Header;
