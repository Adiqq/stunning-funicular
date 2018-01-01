import React, { Component } from 'react';
import MainMenuUser from './MainMenuUser';
import { MainMenuGuest } from './MainMenuGuest';
import { getRole } from '../reducers/user';
import { connect } from 'react-redux';
import MainMenuAdmin from './MainMenuAdmin';

const MainMenu = ({ role }) => {
  switch (role) {
    case 'User':
      return (
        <nav
          className="navbar is-primary"
          role="navigation"
          aria-label="dropdown navigation"
        >
          <MainMenuUser />
        </nav>
      );
    case 'Administrator':
      return (
        <nav
          className="navbar is-primary"
          role="navigation"
          aria-label="dropdown navigation"
        >
          <MainMenuAdmin />
        </nav>
      );
    default:
      return (
        <nav
          className="navbar is-primary"
          role="navigation"
          aria-label="dropdown navigation"
        >
          <MainMenuGuest />
        </nav>
      );
  }
};

const mapStateToProps = state => ({
  role: getRole(state)
});

export default connect(mapStateToProps)(MainMenu);
