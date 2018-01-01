import React from 'react';
import PropTypes from 'prop-types';
import { getFlat } from '../reducers/flats';
import { connect } from 'react-redux';
import EditApartamentForm from '../components/EditApartamentForm';
import { addFlat, updateFlat } from '../actions';
import { bindActionCreators } from 'redux';

const FlatEditContainer = ({ flat, submitToServer }) => (
  <EditApartamentForm initialValues={flat} submitToServer={submitToServer} />
);

const mapStateToProps = (state, ownProps) => {
  return {
    flat: getFlat(state, ownProps.match.params.id)
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    submitToServer: bindActionCreators(
      ownProps.match.params.id ? updateFlat : addFlat,
      dispatch
    )
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FlatEditContainer);
