import React, { Component } from 'react';
import './MainMenu.css';
import MainMenuUser from './MainMenuUser';
import { MainMenuGuest } from './MainMenuGuest';
import { getRole } from '../reducers/user';
import { connect } from 'react-redux';
import MainMenuAdmin from './MainMenuAdmin';

const MainMenu = ({ role }) => {
  switch (role) {
    case 'User':
      return <MainMenuUser />;
    case 'Administrator':
      return <MainMenuAdmin />;
    default:
      return <MainMenuGuest />;
  }
};

const mapStateToProps = state => ({
  role: getRole(state)
});

export default connect(mapStateToProps)(MainMenu);
