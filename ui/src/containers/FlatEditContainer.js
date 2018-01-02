import React from 'react';
import { getFlat } from '../reducers/flats';
import { connect } from 'react-redux';
import EditApartamentForm from '../components/EditApartamentForm';
import { addFlat, deleteFlat, updateFlat } from '../actions';
import { bindActionCreators } from 'redux';

const FlatEditContainer = ({ flat, submitToServer, deleteFlat }) => (
  <EditApartamentForm
    initialValues={flat}
    submitToServer={submitToServer}
    deleteFlat={deleteFlat}
  />
);

const mapStateToProps = (state, ownProps) => {
  return {
    flat: getFlat(state, ownProps.match.params.id)
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  console.log(ownProps.match.params.id);
  return {
    submitToServer: bindActionCreators(
      ownProps.match.params.id ? updateFlat : addFlat,
      dispatch
    ),
    deleteFlat: bindActionCreators(deleteFlat, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FlatEditContainer);
