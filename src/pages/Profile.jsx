import React, { useEffect, useState/* , useContext */ /* useEffect  */ } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import './Profile.css';

function Profile() {
  const [userEmailOnLocalStorage, setUserEmailOnLocalStorage] = useState('');
  const history = useHistory();

  const setLogin = () => {
    const convertedEmail = JSON.parse(localStorage.getItem('user') || '[]');
    setUserEmailOnLocalStorage(convertedEmail.email);
  };

  const clearStorage = () => localStorage.clear();

  useEffect(() => {
    setLogin();
  }, []);

  return (
    <div>

      <Header titulo="Profile" searchInput={ false } />
      <div className="allProfile">
        <h3
          data-testid="profile-email"
          className="emailLstorage"
        >
          {' '}
          {userEmailOnLocalStorage}
        </h3>
        <button
          type="button"
          data-testid="profile-done-btn"
          onClick={ () => history.push('/done-recipes') }
          className="button-profile-btns"
        >
          Done Recipes
        </button>

        <button
          type="button"
          data-testid="profile-favorite-btn"
          className="button-profile-btns"
          onClick={ () => history.push('/favorite-recipes') }
        >
          Favorite Recipes
        </button>

        {' '}
        <button
          type="button"
          data-testid="profile-logout-btn"
          className="button-profile-btns"
          onClick={ () => { clearStorage(); history.push('/'); } }
        >
          Logout
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
