import React, { Component } from 'react';
import './ApartamentsButtons.css';
import { Link } from 'react-router-dom';
class ApartamentsButtons extends Component {
  render() {
    return (
      <Link to="/apartament/">
        <button>Dodaj mieszkanie</button>
      </Link>
    );
  }
}

export default ApartamentsButtons;
