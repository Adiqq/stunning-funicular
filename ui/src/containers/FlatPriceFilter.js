import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPriceRange } from '../reducers/filters';
import { priceFilterChange } from '../actions';
import RangeFilter from '../components/RangeFilter';

const FlatPriceFilter = ({ range, priceFilterChange }) => (
  <RangeFilter
    minLabel="Minimalna cena"
    maxLabel="Maksymalna cena"
    range={range}
    filterChanged={priceFilterChange}
  />
);

FlatPriceFilter.propTypes = {
  range: PropTypes.shape({
    min: PropTypes.number.isOptional,
    max: PropTypes.number.isOptional
  }),
  priceFilterChange: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    range: getPriceRange(state)
  };
};

export default connect(mapStateToProps, { priceFilterChange })(FlatPriceFilter);
