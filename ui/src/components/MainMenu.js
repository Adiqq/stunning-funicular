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
      return (
        <nav>
          <MainMenuUser />
        </nav>
      );
    case 'Administrator':
      return (
        <nav>
          <MainMenuAdmin />
        </nav>
      );
    default:
      return (
        <nav>
          <MainMenuGuest />
        </nav>
      );
  }
};

const mapStateToProps = state => ({
  role: getRole(state)
});

export default connect(mapStateToProps)(MainMenu);
