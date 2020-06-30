import React, { Fragment } from 'react';
import PropTypes from 'prop-types'
import Moment from 'react-moment';

const ProfileExp = ({ exp }) => {
  const {
    title,
    company,
    location,
    from,
    to,
    current,
    description
  } = exp;
  return (
    <Fragment>
      <div className="text-dark">{company}</div>
      <p>
        <Moment format='YYYY/MM/DD'>{from}</Moment> - {to ? <Moment format='YYYY/MM/DD'>{to}</Moment> : 'Now'}
      </p>
      <p>
        <strong>Position: </strong> {title}
      </p>
      {description && (
        <Fragment>
          <p>
            <strong>Description: </strong> {description}
          </p>
        </Fragment>
      )}

    </Fragment>
  )
};

ProfileExp.propTypes = {
  exp: PropTypes.object.isRequired,
}

export default ProfileExp
