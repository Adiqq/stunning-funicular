import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const FlatItem = ({ flat }) => (
  <tr>
    <td>
      <img
        alt={flat.Pictures[0].Filename}
        src={'http://localhost:3001/uploads/' + flat.Pictures[0].Filename}
        height="50"
      />
    </td>
    <td>{flat.City}</td>
    <td>{flat.NumberOfRooms}</td>
    <td>{flat.RoomArea}</td>
    <td>{flat.Floor}</td>
    <td>{flat.HasBalcony ? 'Tak' : 'Nie'}</td>
    <td>{flat.Price}</td>
    <td>
      <Link to={'/apartament/details/' + flat.Id}>
        <button>Szczegóły</button>
      </Link>
    </td>
  </tr>
);

FlatItem.propTypes = {
  flat: PropTypes.shape({
    Id: PropTypes.string.isRequired,
    City: PropTypes.string.isRequired,
    NumberOfRooms: PropTypes.number.isRequired,
    RoomArea: PropTypes.number.isRequired,
    Floor: PropTypes.string.isRequired,
    HasBalcony: PropTypes.bool.isRequired,
    Price: PropTypes.number.isRequired,
    Pictures: PropTypes.arrayOf(
      PropTypes.shape({
        Id: PropTypes.string.isRequired,
        Filename: PropTypes.string.isRequired
      })
    ).isRequired
  }).isRequired
};

export default FlatItem;
