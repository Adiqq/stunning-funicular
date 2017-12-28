import React, { Component } from 'react';
import './MainMenu.css';
import { Link } from 'react-router-dom';

class MainMenu extends Component {
  render() {
    return (
      <div>
        <ul>
          <li>
            <Link to="/">Mieszkania</Link>
          </li>
          <li>
            <Link to="/messages">Wiadomości</Link>
          </li>
          <li>
            <Link to="/picture">Test zdjęć</Link>
          </li>
          <li>
            <Link to="/register">Rejestracja</Link>
          </li>
          <li>
            <Link to="/login">Logowanie</Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default MainMenu;
