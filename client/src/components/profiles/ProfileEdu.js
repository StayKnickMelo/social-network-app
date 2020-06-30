import React from 'react';
import PropTypes from 'prop-types'
import Moment from 'react-moment';

const ProfileEdu = ({ edu }) => {
  const {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    description
  } = edu
  return (
    <div>
      <h3>{school}</h3>
      <p>
        <Moment format="YYYY/MM/DD">{from}</Moment> - {to ? <Moment format='YYYY/MM/DD'>{to}</Moment> : 'Now'}
      </p>
      <p><strong>Degree: </strong>{degree} </p>
      <p><strong>Field of Study: </strong>{fieldofstudy}</p>
      {description && (
        <p>
          <strong>Description: </strong> {description}
        </p>
      )}

    </div>
  )
};


ProfileEdu.propTypes = {
  edu: PropTypes.object.isRequired,
}

export default ProfileEdu
