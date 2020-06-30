import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {deleteProfile} from '../../actions/profile';



const DashBoardActions = ({deleteProfile}) => {
  return (
    <div className='dash-buttons'>
      <Link to='/edit-profile' className='btn btn-light'> <i className="fas fa-user-circle text-primary"></i> Edit Profile </Link>
      <Link className='btn btn-light' to='/add-experience'> <i className="fab fa-black-tie text-primary"></i> Add Experience </Link>
      <Link className='btn btn-light' to='/add-education'> <i className="fas fa-graduation-cap text-primary"></i> Add Education </Link>
      <button onClick={deleteProfile} className="btn btn-danger">Delete Profile</button>
    </div>
  );
};


DashBoardActions.propTypes = {
  deleteProfile: PropTypes.func.isRequired,

}

export default connect(null, {deleteProfile}) (DashBoardActions)
