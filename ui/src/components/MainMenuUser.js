import React from 'react';
import { Link } from 'react-router-dom';

export const MainMenuUser = () => (
  <ul>
    <li>
      <Link to="/">Mieszkania</Link>
    </li>
    <li>
      <Link to="/messages">Wiadomości</Link>
    </li>
    <li>
      <Link to="/signout">Wyloguj</Link>
    </li>
  </ul>
);
