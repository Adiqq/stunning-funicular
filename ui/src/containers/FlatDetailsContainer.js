import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getFlat } from '../reducers/flats';
import { connect } from 'react-redux';
import { floorConverter } from '../helpers/floors';
import { flatView, getAllFlats } from '../actions';
import { ReadOnlyInputField } from '../components/ReadOnlyInputField';
import { baseUrl } from '../constants/Config';

class FlatDetailsContainer extends Component {
  componentDidMount() {
    this.props.getAllFlats();
    this.props.flatView(this.props.flat.Id);
    window.scrollTo(0, 0);
  }

  render() {
    const { flat } = this.props;
    console.log(flat);
    if (!flat) return null;
    return (
      <div className="columns">
        <div className="column">
          <ReadOnlyInputField label="Miasto" value={flat.City} />
          <ReadOnlyInputField label="Ulica" value={flat.Street} />
          <ReadOnlyInputField label="Pokoje" value={flat.NumberOfRooms} />
          <ReadOnlyInputField label="Powierzchnia" value={flat.RoomArea} />
          <ReadOnlyInputField
            label="Piętro"
            value={floorConverter(flat.Floor)}
          />
          <ReadOnlyInputField
            label="Balkon"
            value={flat.HasBalcony ? 'Tak' : 'Nie'}
          />
          <ReadOnlyInputField label="Opis" value={flat.Description} />
          <ReadOnlyInputField label="Cena" value={flat.Price} />
        </div>
        <div className="column">
          {flat.Pictures.map(picture => (
            <div className="card" key={picture.Id}>
              <div className="card-image">
                <figure className="image">
                  <img
                    src={`${baseUrl}uploads/${picture.Filename}`}
                    alt={picture.Filename}
                  />
                </figure>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

FlatDetailsContainer.propTypes = {
  flat: PropTypes.shape({
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
    ).isRequired
  }).isRequired,
  getAllFlats: PropTypes.func.isRequired,
  flatView: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => {
  return {
    flat: getFlat(state, ownProps.match.params.id)
  };
};

export default connect(mapStateToProps, { getAllFlats, flatView })(
  FlatDetailsContainer
);
