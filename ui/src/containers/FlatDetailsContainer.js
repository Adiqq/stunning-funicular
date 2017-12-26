import React from 'react';
import PropTypes from 'prop-types';
import { getFlat } from '../reducers/flats';
import { connect } from 'react-redux';

const FlatDetailsContainer = ({ flat }) => {
  console.log(flat);
  if (!flat) return null;
  return (
    <div style={{ margin: '20px' }}>
      <p>{flat.City}</p>
      <p>{flat.Street}</p>
      <p>{flat.NumberOfRooms}</p>
      <p>{flat.RoomArea}</p>
      <p>{flat.Floor}</p>
      <p>{flat.HasBalcony ? 'Tak' : 'Nie'}</p>
      <p>{flat.Description}</p>
      <p>{flat.Price}</p>
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
};

FlatDetailsContainer.propTypes = {
  flat: PropTypes.shape({
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
  }).isRequired
};

const mapStateToProps = (state, ownProps) => {
  return {
    flat: getFlat(state.flats, ownProps.match.params.id)
  };
};

export default connect(mapStateToProps)(FlatDetailsContainer);
