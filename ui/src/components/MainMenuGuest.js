import React from 'react';
import { Link } from 'react-router-dom';

export const MainMenuGuest = () => (
  <ul>
    <li>
      <Link to="/register">Rejestracja</Link>
    </li>
    <li>
      <Link to="/login">Logowanie</Link>
    </li>
  </ul>
);
