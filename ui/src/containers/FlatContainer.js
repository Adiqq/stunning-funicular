import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FlatItem from '../components/FlatItem';
import { getFlats } from '../reducers/flats';
import { Link } from 'react-router-dom';
import FlatPriceFilter from './FlatPriceFilter';
import NumberOfRoomsFilter from './NumberOfRoomsFilter';
import RoomAreaFilter from './RoomAreaFilter';
import BalconyFilter from './BalconyFilter';
import { getAllFlats, wantBuy } from '../actions';
import * as action from '../actions';

class FlatContainer extends Component {
  componentDidMount() {
    console.log('did mount');
    this.props.getAllFlats();
  }
  componentDidUpdate() {
    console.log('did update');
  }
  render() {
    const { flats, wantBuy } = this.props;
    return (
      <div>
        <Link to={'apartament'}>
          <button>Dodaj ofertę</button>
        </Link>
        <FlatPriceFilter />
        <NumberOfRoomsFilter />
        <RoomAreaFilter />
        <BalconyFilter />
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
          <tbody>
            {flats.map(flat => (
              <FlatItem key={flat.Id} flat={flat} wantBuy={wantBuy} />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

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
      ).isRequired
    })
  ).isRequired,
  wantBuy: PropTypes.func.isRequired,
  getAllFlats: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  flats: getFlats(state.flats)
});

export default connect(mapStateToProps, { wantBuy, getAllFlats })(
  FlatContainer
);
