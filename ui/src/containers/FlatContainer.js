import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FlatItem from '../components/FlatItem';
import { getLastViewedFlats, getVisibleFlats } from '../reducers/flats';
import { Link } from 'react-router-dom';
import FlatPriceFilter from './FlatPriceFilter';
import NumberOfRoomsFilter from './NumberOfRoomsFilter';
import RoomAreaFilter from './RoomAreaFilter';
import BalconyFilter from './BalconyFilter';
import { getAllFlats, wantBuy } from '../actions';

class FlatContainer extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.getAllFlats();
  }

  componentDidUpdate() {
    console.log('did update');
  }

  render() {
    const { flats, flatViews, wantBuy } = this.props;
    return (
      <div>
        <Link className="button is-primary" to={'apartament'}>
          Dodaj ofertę
        </Link>
        <div className="box">
          <FlatPriceFilter />
          <NumberOfRoomsFilter />
          <RoomAreaFilter />
          <BalconyFilter />
        </div>
        <div className={flatViews.length ? '' : 'is-hidden'}>
          <h3 className="subtitle">Ostatnio przeglądane</h3>
          <table className="table">
            <thead>
              <tr>
                <th>Zdjęcie</th>
                <th>Użytkownik</th>
                <th>Miasto</th>
                <th>Liczba pokoi</th>
                <th>Powierzchnia</th>
                <th>Piętro</th>
                <th>Posiada balkon</th>
                <th>Cena</th>
                <th>&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              {flatViews.map(flat => (
                <FlatItem key={flat.Id} flat={flat} wantBuy={wantBuy} />
              ))}
            </tbody>
          </table>
        </div>
        <h3 className="subtitle">Mieszkania</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Zdjęcie</th>
              <th>Użytkownik</th>
              <th>Miasto</th>
              <th>Liczba pokoi</th>
              <th>Powierzchnia</th>
              <th>Piętro</th>
              <th>Posiada balkon</th>
              <th>Cena</th>
              <th>&nbsp;</th>
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
      Floor: PropTypes.number.isRequired,
      HasBalcony: PropTypes.bool.isRequired,
      Description: PropTypes.string.isRequired,
      Price: PropTypes.number.isRequired,
      Pictures: PropTypes.arrayOf(
        PropTypes.shape({
          Id: PropTypes.string.isRequired,
          Filename: PropTypes.string.isRequired
        })
      ).isRequired,
      Sold: PropTypes.bool.isRequired
    })
  ).isRequired,
  wantBuy: PropTypes.func.isRequired,
  getAllFlats: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  flats: getVisibleFlats(state),
  flatViews: getLastViewedFlats(state)
});

export default connect(mapStateToProps, { wantBuy, getAllFlats })(
  FlatContainer
);
