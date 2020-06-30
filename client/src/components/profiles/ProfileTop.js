import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import userLogo from '../../img/avatar-default-icon.png';


const ProfileTop = ({ profile }) => {
  const {
    status,
    avatar,
    company,
    location,
    social,
    website,
    user: {
      name,
      _id
    }
  } = profile;
  return (
    <div className='profile-top bg-primary p-2'>
      <img className='round-img my-1' src={avatar ? `/api/image/${_id}` : userLogo} alt="" />
      <h1 className="large">{name}</h1>
      <p className="lead">{status} {company && <span>at {company}</span>}</p>
      <p>{location && location}</p>

      <div className="icons my-1">
        {website && (
          <a href={website} target='_blank' rel="noopener noreferrer">
            <i className="fas fa-globe fa-2x"></i>
          </a>
        )}
        {social && social.twitter && (
          <a href={social.twitter} target='_blank'>
            <i className="fab fa-twitter fa-2x"></i>
          </a>
        )}
        {social && social.instagram && (
          <a href={social.instagram} target='_blank'>
            <i className="fab fa-instagram fa-2x"></i>
          </a>
        )}
        {social && social.facebook && (
          <a href={social.facebook} target='_blank'>
            <i className="fab fa-facebook fa-2x"></i>
          </a>
        )}
        {social && social.youtube && (
          <a href={social.youtube} target='_blank'>
            <i className="fab fa-youtube fa-2x"></i>
          </a>
        )}
        {social && social.linkedin && (
          <a href={social.linkedin} target='_blank'>
            <i className="fab fa-linkedin fa-2x"></i>
          </a>
        )}

      </div>

    </div>
  )
};

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired,
}

export default ProfileTop
