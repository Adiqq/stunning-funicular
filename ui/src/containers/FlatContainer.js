import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { showDetails } from '../actions';
import { getVisibleFlats } from '../reducers/flats';
import FlatItem from '../components/FlatItem';

const FlatContainer = ({ flats, showDetails }) => (
  <table>
    <tr>
      <th>Zdjęcie</th>
      <th>Miasto</th>
      <th>Liczba pokoi</th>
      <th>Piętro</th>
      <th>Posiada balkon</th>
      <th>Cena</th>
    </tr>
    {flats.map(flat => (
      <FlatItem
        key={flat.id}
        flat={flat}
        onShowDetailsClicked={() => showDetails(flat.id)}
      />
    ))}
  </table>
);

FlatContainer.propTypes = {
  flats: PropTypes.arrayOf(
    PropTypes.shape({
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
    })
  ).isRequired,
  showDetails: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  products: getVisibleFlats(state.flats)
});

export default connect(mapStateToProps, { showDetails })(FlatContainer);
