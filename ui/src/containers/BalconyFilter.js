import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getBalcony } from '../reducers/filters';
import { balconyFilterChange } from '../actions';

const BalconyFilter = ({ balcony, balconyFilterChange }) => {
  const handleInputChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    balconyFilterChange(
      value === 'true' ? true : value === 'false' ? false : undefined
    );
  };

  return (
    <div className="select">
      <select value={balcony} onChange={handleInputChange}>
        <option value="">Z balkonem?</option>
        <option value="true">Tak</option>
        <option value="false">Nie</option>
      </select>
    </div>
  );
};

BalconyFilter.propTypes = {
  balcony: PropTypes.bool,
  balconyFilterChange: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    balcony: getBalcony(state)
  };
};

export default connect(mapStateToProps, { balconyFilterChange })(BalconyFilter);
