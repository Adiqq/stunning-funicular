import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getNumberOfRoomsRange } from '../reducers/filters';
import { numberOfRoomsFilterChange } from '../actions';
import RangeFilter from '../components/RangeFilter';

const NumberOfRoomsFilter = ({ range, numberOfRoomsFilterChange }) => (
  <RangeFilter
    minLabel="Minimalna liczba pokoi"
    maxLabel="Maksymalna liczba pokoi"
    range={range}
    filterChanged={numberOfRoomsFilterChange}
  />
);

NumberOfRoomsFilter.propTypes = {
  range: PropTypes.shape({
    min: PropTypes.number.isOptional,
    max: PropTypes.number.isOptional
  }),
  numberOfRoomsFilterChange: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    range: getNumberOfRoomsRange(state)
  };
};

export default connect(mapStateToProps, { numberOfRoomsFilterChange })(
  NumberOfRoomsFilter
);
