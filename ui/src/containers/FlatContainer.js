import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FlatItem from '../components/FlatItem';
import { getFlats } from '../reducers/flats';
import { Link } from 'react-router-dom';

const FlatContainer = ({ flats }) => (
  <div>
    <Link to={'apartament'}>
      <button>Dodaj ofertę</button>
    </Link>
    <table>
      <thead>
        <tr>
          <th>Zdjęcie</th>
          <th>Miasto</th>
          <th>Liczba pokoi</th>
          <th>Powierzchnia</th>
          <th>Piętro</th>
          <th>Posiada balkon</th>
          <th>Cena</th>
        </tr>
      </thead>
      <tbody>{flats.map(flat => <FlatItem key={flat.Id} flat={flat} />)}</tbody>
    </table>
  </div>
);

FlatContainer.propTypes = {
  flats: PropTypes.arrayOf(
    PropTypes.shape({
      Id: PropTypes.string.isRequired,
      UserId: PropTypes.string.isRequired,
      City: PropTypes.string.isRequired,
      Street: PropTypes.string.isRequired,
      NumberOfRooms: PropTypes.number.isRequired,
      RoomArea: PropTypes.number.isRequired,
      Floor: PropTypes.string.isRequired,
      HasBalcony: PropTypes.bool.isRequired,
      Description: PropTypes.string.isRequired,
      Price: PropTypes.number.isRequired,
      Pictures: PropTypes.arrayOf(
        PropTypes.shape({
          Id: PropTypes.string.isRequired,
          Filename: PropTypes.string.isRequired
        })
      ).iDetailssRequired
    })
  ).isRequired
};

const mapStateToProps = state => ({
  flats: getFlats(state.flats)
});

export default connect(mapStateToProps)(FlatContainer);
