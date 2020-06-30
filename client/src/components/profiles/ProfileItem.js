import React from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import userLogo from '../../img/avatar-default-icon.png';





function ProfileItem({ profile: {
  user: { _id, name },
  status,
  company,
  location,
  skills,
  avatar
} }) {







  return (
    <div className="profile bg-light">
      <img className='round-img' src={avatar ? `/api/image/${_id}` : userLogo} alt="" />
      <div>
        <h2>{name}</h2>
        <p>{status} {company && <span>at {company}</span>} </p>
        <p className="my-1">{location && <span>{location}</span>}</p>
        <Link to={`/users/${_id}`} className='btn btn-primary'>View Profile</Link>
      </div>
      <ul>
        {skills.slice(0, 4).map((skill, index) => (
          <li key={index} className="text-primary">
            <i className="fas fa-check"></i> {skill}
          </li>
        ))
        }
      </ul>
    </div>
  )
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
}

export default ProfileItem
