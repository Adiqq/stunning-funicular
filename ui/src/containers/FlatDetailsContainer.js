import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getFlat } from '../reducers/flats';
import { connect } from 'react-redux';
import { floorConverter } from '../helpers/floors';
import { getAllFlats } from '../actions';
import { ReadOnlyInputField } from '../components/ReadOnlyInputField';

class FlatDetailsContainer extends Component {
  componentDidMount() {
    this.props.getAllFlats();
  }
  render() {
    const { flat } = this.props;
    console.log(flat);
    if (!flat) return null;
    return (
      <div>
        <ReadOnlyInputField label="Miasto" value={flat.City} />
        <ReadOnlyInputField label="Ulica" value={flat.Street} />
        <ReadOnlyInputField label="Pokoje" value={flat.NumberOfRooms} />
        <ReadOnlyInputField label="Powierzchnia" value={flat.RoomArea} />
        <ReadOnlyInputField label="Piętro" value={floorConverter(flat.Floor)} />
        <ReadOnlyInputField
          label="Balkon"
          value={flat.HasBalcony ? 'Tak' : 'Nie'}
        />
        <ReadOnlyInputField label="Opis" value={flat.Description} />
        <ReadOnlyInputField label="Cena" value={flat.Price} />
        {flat.Pictures.map(picture => (
          <p key={picture.Id}>
            <img
              src={'http://localhost:3001/uploads/' + picture.Filename}
              alt={picture.Filename}
            />
          </p>
        ))}
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
  }).isRequired
};

const mapStateToProps = (state, ownProps) => {
  return {
    flat: getFlat(state, ownProps.match.params.id)
  };
};

export default connect(mapStateToProps, { getAllFlats })(FlatDetailsContainer);
