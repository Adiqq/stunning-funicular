import React from 'react';
import PropTypes from 'prop-types';
import { getFlat } from '../reducers/flats';
import { connect } from 'react-redux';
import EditApartamentForm from '../components/EditApartamentForm';

const FlatEditContainer = ({ flat }) => <EditApartamentForm />;

const mapStateToProps = (state, ownProps) => {
  return {
    flat: getFlat(state.flats, ownProps.match.params.id)
  };
};

export default connect(mapStateToProps)(FlatEditContainer);
