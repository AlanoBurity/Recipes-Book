import PropTypes from 'prop-types';
import React, { useState } from 'react';
import context from './Context';

const Provider = ({ children }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const contextValue = {
    email,
    setEmail,
    password,
    setPassword,
  };
  return (
    <context.Provider value={ contextValue }>
      { children }
    </context.Provider>);
};

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
