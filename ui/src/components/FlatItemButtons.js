import React from 'react';
import { Link } from 'react-router-dom';
import FlatItem from './FlatItem';
import PropTypes from 'prop-types';

const FlatItemButtons = ({ flat, wantBuy }) => {
  if (flat.isOwnFlat) {
    return (
      <td>
        <Link to={'/apartament/details/' + flat.Id}>
          <button>Szczegóły</button>
        </Link>
        <Link to={'/apartament/' + flat.Id}>
          <button>Edytuj</button>
        </Link>
      </td>
    );
  } else {
    return (
      <td>
        <Link to={'/apartament/details/' + flat.Id}>
          <button>Szczegóły</button>
        </Link>
        <button
          onClick={() => {
            wantBuy(flat.Id);
          }}
        >
          Chcę kupić
        </button>
      </td>
    );
  }
};

FlatItemButtons.propTypes = {
  flat: PropTypes.shape({
    Id: PropTypes.string.isRequired,
    City: PropTypes.string.isRequired,
    NumberOfRooms: PropTypes.number.isRequired,
    RoomArea: PropTypes.number.isRequired,
    Floor: PropTypes.number.isRequired,
    HasBalcony: PropTypes.bool.isRequired,
    Price: PropTypes.number.isRequired,
    Pictures: PropTypes.arrayOf(
      PropTypes.shape({
        Id: PropTypes.string.isRequired,
        Filename: PropTypes.string.isRequired
      })
    ).isRequired,
    Sold: PropTypes.bool.isRequired,
    isOwnFlat: PropTypes.bool.isRequired
  }).isRequired,
  wantBuy: PropTypes.func.isRequired
};

export default FlatItemButtons;
