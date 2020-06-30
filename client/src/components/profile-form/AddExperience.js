import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addExperience } from '../../actions/profile';


const AddExperience = ({ addExperience, history }) => {

  const [exp, setExp] = useState({
    title: '',
    company: '',
    location: '',
    from: '',
    to: '',
    current: false,
    description: ''

  });

  const [toDateDisable, setToDateDisabled] = useState(false);


  const {
    title,
    company,
    location,
    from,
    to,
    current,
    description
  } = exp;

  const onCahnge = (e) => {
    setExp({ ...exp, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    addExperience(exp, history);

    setExp({
      title: '',
      company: '',
      location: '',
      from: '',
      to: '',
      current: false,
      description: ''

    })
  }
  return (
    <Fragment>
      <h1 className="large text-primary">
        Add An Experience
      </h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Add
        positions that you have had in the past
      </p>
      <small>* = required field</small>
      <form onSubmit={onSubmit} className="form">
        <div className="form-group">
          <input type="text" placeholder="* Job Title" name="title" value={title} onChange={onCahnge} />
        </div>
        <div className="form-group">
          <input type="text" placeholder="* Company" name="company" value={company} onChange={onCahnge} />
        </div>
        <div className="form-group">
          <input type="text" placeholder="Location" name="location" value={location} onChange={onCahnge} />
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input type="date" name="from" value={from} onChange={onCahnge} />
        </div>
        <div className="form-group">
          <p><input type="checkbox" name="current" value={current} onChange={() => setToDateDisabled(!toDateDisable)} /> Current Job</p>
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input type="date" name="to" value={to} disabled={toDateDisable} onChange={onCahnge} />
        </div>
        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Job Description"
            value={description}
            onChange={onCahnge}
          ></textarea>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
      </form>

    </Fragment>
  )
};

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired,
}

export default connect(null, { addExperience })(AddExperience)
