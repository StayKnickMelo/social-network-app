import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getProfiles } from '../../actions/profile';
import PropTypes from 'prop-types';
import ProfileItem from './ProfileItem';

import {createProfile} from '../../actions/profile';



const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {

  useEffect(() => {
    getProfiles();
  }, [createProfile]);
  return (
    <Fragment>
      {loading ?
        <Spinner />
        : <Fragment>
          <h1 className="large text-primary">Users</h1>
          <p className="lead">
            <i className="fab fa-connectdevelop"></i> Browse and connect with people
          </p>
          <div className="profiles">
            {profiles && profiles.length > 0 ? profiles.map(profile => (<ProfileItem profile={profile} key={profile._id} />)) :
              <h4>No Profiles Found</h4>}
          </div>
        </Fragment>}
    </Fragment>
  );
};

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object,
}

const mapStateToProps = (state) => ({
  profile: state.profile


})

export default connect(mapStateToProps, { getProfiles })(Profiles)
