import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getRoomAreaRange } from '../reducers/filters';
import { roomAreaFilterChange } from '../actions';
import RangeFilter from '../components/RangeFilter';

const RoomAreaFilter = ({ range, roomAreaFilterChange }) => (
  <RangeFilter
    minLabel="Minimalna powierzchnia"
    maxLabel="Maksymalna powierzchnia"
    range={range}
    filterChanged={roomAreaFilterChange}
  />
);

RoomAreaFilter.propTypes = {
  range: PropTypes.shape({
    min: PropTypes.number.isOptional,
    max: PropTypes.number.isOptional
  }),
  roomAreaFilterChange: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    range: getRoomAreaRange(state)
  };
};

export default connect(mapStateToProps, { roomAreaFilterChange })(
  RoomAreaFilter
);
