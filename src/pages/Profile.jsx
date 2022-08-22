import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Profile() {
  const [userEmailOnLocalStorage, setUserEmailOnLocalStorage] = useState('');
  const history = useHistory();

  useEffect(() => {
    const convertedEmail = JSON.parse(localStorage.getItem('user'));
    if (convertedEmail !== null) setUserEmailOnLocalStorage(convertedEmail.email);
    else setUserEmailOnLocalStorage(userEmailOnLocalStorage);
  }, []);

  const clearStorage = () => localStorage.clear();

  return (
    <div>

      <Header titulo="Profile" searchInput={ false } />
      <h1 data-testid="profile-email">
        {' '}
        {userEmailOnLocalStorage}
      </h1>
      <button
        type="button"
        data-testid="profile-done-btn"
        onClick={ () => history.push('/done-recipes') }
      >
        Done Recipes
      </button>

      <button
        type="button"
        data-testid="profile-favorite-btn"
        className="button profile-btns"
        onClick={ () => history.push('/favorite-recipes') }
      >
        Favorite Recipes
      </button>

      {' '}
      <button
        type="button"
        data-testid="profile-logout-btn"
        className="button profile-btns"
        onClick={ () => { clearStorage(); history.push('/'); } }
      >
        Logout
      </button>
      <Footer />
    </div>
  );
}

export default Profile;
