import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { getProfileById } from '../../actions/profile';
import Spinner from '../../components/layout/Spinner';
import { Link } from 'react-router-dom';

// Components
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExp from './ProfileExp';
import ProfileEdu from './ProfileEdu';


const Profile = ({ match, getProfileById, auth, profile: { loading, profile } }) => {

  const id = match.params.id;

  useEffect(() => {
    getProfileById(id);
  }, []);
  return (
    <Fragment>
      {loading || profile === null ? <Spinner /> :
        <Fragment>
          <Link to='/users' className='btn btn-primary'>Back</Link>
          {auth.isAuthenticated && auth.loading === false && auth.user._id === profile.user._id && (<Link to='/edit-profile' className='btn btn-dark'>Edit Profile</Link>)}
          <div className="profile-grid my-1">
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />

            {profile.experience && profile.experience.length > 0 && (
              <div className="profile-exp bg-white p-2">
                <h2 className="text-primary">Experience</h2>
                {profile.experience.map(exp => (
                  <ProfileExp exp={exp} key={exp._id} />
                ))}
              </div>

            )}

            {profile.education && profile.education.length > 0 && (
              <div className="profile-edu bg-white p-2">
                <h2 className='text-primary'>Education</h2>
                {profile.education.map(edu => (
                  <ProfileEdu edu={edu} key={edu._id} />
                ))}
              </div>
            )}



          </div>

        </Fragment>
      }

    </Fragment>
  )
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile
})

export default connect(mapStateToProps, { getProfileById })(Profile)
