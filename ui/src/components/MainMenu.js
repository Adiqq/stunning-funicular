import React, { Component } from 'react';
import './MainMenu.css';
import { Link } from 'react-router-dom';
import MainMenuUser from './MainMenuUser';
import { MainMenuGuest } from './MainMenuGuest';
import { getRole } from '../reducers/users';
import { connect } from 'react-redux';

const MainMenu = ({ role }) => {
  if (role) {
    return <MainMenuUser />;
  } else {
    return <MainMenuGuest />;
  }
};

const mapStateToProps = state => ({
  role: getRole(state.users)
});

export default connect(mapStateToProps)(MainMenu);
