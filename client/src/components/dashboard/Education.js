import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deleteEdu } from '../../actions/profile';


const Education = ({ deleteEdu, education }) => {

  const educations = education.map(edu => (
    <tr key={edu._id}>
      <td>{edu.school}</td>
      <td className="hide-sm">{edu.degree}</td>
      <td className="hide-sm">{edu.fileldofstudy}</td>
      <td className="hide-sm">{edu.description}</td>
      <td>
        <Moment format='YYYY/MM/DD'>{edu.from}</Moment> - {edu.to ? <Moment format='YYYY/MM/DD'>{edu.tu}</Moment> : 'Now'}
      </td>
      <td>
        <button onClick={()=> deleteEdu(edu._id)} className="btn btn-danger">Delete</button>
      </td>
    </tr>
  ))
  return (
    <Fragment>
      <h2 className="my-2">Education Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>School</th>
            <th className="hide-sm">Degree</th>
            <th className="hide-sm">Field of Study</th>
            <th className="hide-sm">Description</th>
            <th className="hide-sm">Years</th>
            <th />
          </tr>
        </thead>
        <tbody>{educations}</tbody>
      </table>

    </Fragment>
  )
}

Education.propTypes = {
  deleteEdu: PropTypes.func.isRequired,
  education: PropTypes.array.isRequired,
}

export default connect(null, {deleteEdu})(Education)
