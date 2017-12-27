import React from 'react';
import PropTypes from 'prop-types';
import { getFlat } from '../reducers/flats';
import { connect } from 'react-redux';
import EditApartamentForm from '../components/EditApartamentForm';
import { addFlat } from '../actions';
import { bindActionCreators } from 'redux';

const FlatEditContainer = ({ flat, submitToServer }) => (
  <EditApartamentForm flat={flat} submitToServer={submitToServer} />
);

const mapStateToProps = (state, ownProps) => {
  return {
    flat: getFlat(state.flats, ownProps.match.params.id)
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    submitToServer: bindActionCreators(
      ownProps.match.params.id ? () => {} : addFlat,
      dispatch
    )
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FlatEditContainer);
