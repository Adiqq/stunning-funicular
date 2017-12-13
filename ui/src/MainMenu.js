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
        </ul>
      </div>
    );
  }
}

export default MainMenu;
