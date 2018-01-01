import React from 'react';
import { Link } from 'react-router-dom';

export const MainMenuGuest = () => (
  <div className="navbar-menu">
    <div className="navbar-start">
      <Link className="navbar-item" to="/register">
        Rejestracja
      </Link>
      <Link className="navbar-item" to="/login">
        Logowanie
      </Link>
    </div>
  </div>
);
