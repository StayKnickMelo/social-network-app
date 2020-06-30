import React, { useState, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addEducation } from '../../actions/profile';

const AddEducation = ({ addEducation, history }) => {

  const [edu, setEdu] = useState({
    school: '',
    degree: '',
    fieldofstudy: '',
    from: '',
    to: '',
    current: false,
    description: ''
  });

  const [toDateDisabled, setToDateDisabled] = useState(false);

  const {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description

  } = edu;

  const onChange = (e) => {
    setEdu({ ...edu, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    addEducation(edu, history);

    setEdu({
      school: '',
      degree: '',
      fieldofstudy: '',
      from: '',
      to: '',
      current: false,
      description: ''
    })


  }


  return (
    <Fragment>
      <h1 className="large text-primary">
        Add Your Education
      </h1>
      <p className="lead">
        <i className="fas fa-graduation-cap"></i> Add any school, that
        you have attended
      </p>
      <small>* = required field</small>
      <form onSubmit={onSubmit} className="form">
        <div className="form-group">
          <input
            type="text"
            placeholder="* School"
            name="school"
            value={school}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Degree or Certificate"
            name="degree"
            value={degree}
            onChange={onChange}

          />
        </div>
        <div className="form-group">
          <input type="text" placeholder="Field Of Study" name="fieldofstudy" value={fieldofstudy}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input type="date" name="from" value={from}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <p>
            <input type="checkbox" name="current" value={false} onChange={() => setToDateDisabled(!toDateDisabled)} /> Current School
          </p>
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input type="date" name="to" value={to} disabled={toDateDisabled}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Program Description"
            value={description}
            onChange={onChange}
          ></textarea>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
      </form>

    </Fragment>
  )
};

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
}

export default connect(null, { addEducation })(withRouter(AddEducation))
