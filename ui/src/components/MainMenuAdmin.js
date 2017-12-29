import React from 'react';
import { Link } from 'react-router-dom';
import { signout } from '../actions';
import { connect } from 'react-redux';

const MainMenuAdmin = ({ signout }) => (
  <ul>
    <li>
      <Link to="/">Mieszkania</Link>
    </li>
    <li>
      <Link to="/messages">Wiadomości</Link>
    </li>
    <li>
      <Link to="/users">Użytkownicy</Link>
    </li>
    <li>
      <a href="javascript:void(0)" onClick={signout}>
        Wyloguj
      </a>
    </li>
  </ul>
);

export default connect(null, { signout })(MainMenuAdmin);
