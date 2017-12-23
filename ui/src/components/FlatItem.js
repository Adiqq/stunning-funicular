import React from 'react';
import PropTypes from 'prop-types';

const FlatItem = ({ flat, onShowDetailsClicked }) => (
  <tr>
    <td>Zdjęcie</td>
    <td>Miasto</td>
    <td>Liczba pokoi</td>
    <td>Piętro</td>
    <td>Posiada balkon</td>
    <td>Cena</td>
    <td>
      <button onClick={onShowDetailsClicked}>Details</button>
    </td>
  </tr>
);

FlatItem.propTypes = {
  flat: PropTypes.shape({
    id: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    street: PropTypes.string.isRequired,
    numberOfRooms: PropTypes.number.isRequired,
    roomArea: PropTypes.number.isRequired,
    floor: PropTypes.string.isRequired,
    hasBalcony: PropTypes.bool.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    pictures: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        filename: PropTypes.string.isRequired
      })
    ).isRequired
  }).isRequired,
  onShowDetailsClicked: PropTypes.func.isRequired
};

export default FlatItem;
