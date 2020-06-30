import React, { Fragment } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { deleteExp } from '../../actions/profile';
import Moment from 'react-moment';



const Experience = ({ experience, deleteExp }) => {

  const experiences = experience.map(exp => (
    <tr key={exp._id}>
      <td>{exp.company}</td>
      <td className="hide-sm">{exp.title}</td>
      <td className="hide-sm">{exp.description}</td>
      <td>
        <Moment format='YYYY/MM/DD'>{exp.from}</Moment> - {exp.to ? <Moment format='YYYY/MM/DD' >{exp.to}</Moment> : 'Now'}
      </td>
      <td>
        <button onClick={() => deleteExp(exp._id)} className="btn btn-danger">Delete</button>
      </td>
    </tr>
  ))
  return (
    <Fragment>
      <h2 className="my-2">Experience Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Company</th>
            <th className="hide-sm">Title</th>
            <th className="hide-sm">Description</th>
            <th className="hide-sm">Years</th>
            <th />
          </tr>
        </thead>
        <tbody>{experiences}</tbody>
      </table>
    </Fragment>
  )
};

Experience.propTypes = {
  deleteExp: PropTypes.func.isRequired,
  experience: PropTypes.array.isRequired,
}

export default connect(null, { deleteExp })(Experience)
