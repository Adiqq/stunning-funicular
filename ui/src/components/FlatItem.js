import React from 'react';
import PropTypes from 'prop-types';
import { floorConverter } from '../helpers/floors';
import FlatItemButtons from './FlatItemButtons';

const FlatItem = ({ flat, wantBuy }) => (
  <tr>
    <td>
      <img
        alt={flat.Pictures.length ? flat.Pictures[0].Filename : ''}
        src={
          'http://localhost:3001/uploads/' +
          (flat.Pictures.length ? flat.Pictures[0].Filename : '')
        }
        width="128"
      />
    </td>
    <td>{flat.UserId}</td>
    <td>{flat.City}</td>
    <td>{flat.NumberOfRooms}</td>
    <td>{flat.RoomArea}</td>
    <td>{floorConverter(flat.Floor)}</td>
    <td>{flat.HasBalcony ? 'Tak' : 'Nie'}</td>
    <td>{flat.Price}</td>
    <FlatItemButtons flat={flat} wantBuy={wantBuy} />
  </tr>
);

FlatItem.propTypes = {
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

export default FlatItem;
