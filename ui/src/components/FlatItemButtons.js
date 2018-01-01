import React from 'react';
import { Link } from 'react-router-dom';
import FlatItem from './FlatItem';
import PropTypes from 'prop-types';

const FlatItemButtons = ({ flat, wantBuy }) => {
  if (flat.isOwnFlat) {
    return (
      <td>
        <div className="buttons">
          <Link
            className="button is-link"
            to={'/apartament/details/' + flat.Id}
          >
            Szczegóły
          </Link>
          <Link className="button is-link" to={'/apartament/' + flat.Id}>
            Edytuj
          </Link>
        </div>
      </td>
    );
  } else {
    return (
      <td>
        <div className="buttons">
          <Link
            className="button is-link"
            to={'/apartament/details/' + flat.Id}
          >
            Szczegóły
          </Link>
          <button
            className="button is-link"
            onClick={() => {
              wantBuy(flat.Id);
            }}
          >
            Chcę kupić
          </button>
        </div>
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
