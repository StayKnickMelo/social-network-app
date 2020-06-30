import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { loadCurrentProfile } from '../../actions/profile';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';

import DashboardActions from './DashBoardActions';
import Education from './Education';
import Experience from './Experience';




const Dashboard = ({ loadCurrentProfile, user, profile: { loading, profile } }) => {

  useEffect(() => {
    loadCurrentProfile();
    //eslint-disable-next-line
  }, []);

  return loading && profile === null ? (<Spinner />) :
    (<Fragment>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user"> Welcome {user && user.name}</i>
      </p>
      {profile !== null ? (
        <Fragment>
          <DashboardActions />
          {profile.education.length > 0 && (
            <Education education={profile.education} />
          )}

          {profile.experience.length > 0 && (
            <Experience experience={profile.experience} />
          )}
        </Fragment>
      ) :
        <Fragment>
          <p>You dont have a profile, please add one</p>
          <Link to='/create-profile' className='btn btn-primary my-1'>Create Profile</Link>
        </Fragment>}

    </Fragment>)
};

Dashboard.propTypes = {
  user: PropTypes.object,
  profile: PropTypes.object.isRequired,
  loadCurrentProfile: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  profile: state.profile
});

export default connect(mapStateToProps, { loadCurrentProfile })(Dashboard)
