import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { register } from '../../actions/auth';
import { setAlert } from '../../actions/alert';
import PropTypes from 'prop-types'


const Register = ({ register, setAlert, isAuthenticated }) => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const {
    name,
    email,
    password,
    confirmPassword
  } = user;

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setAlert('Passwords do not match', 'danger');
    } else {
      register({
        name,
        email: email.toLowerCase(),
        password
      });
    };

    setUser({
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
  }

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />
  }
  return (
    <Fragment>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
      <form className="form" onSubmit={onSubmit} >
        <div className="form-group">
          <input type="text" placeholder="Name" name="name" value={name} onChange={onChange} />
        </div>
        <div className="form-group">
          <input type="text" placeholder="Email Address" name="email" value={email} onChange={onChange} />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={onChange}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </Fragment>
  )
}

Register.propTypes = {
  register: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { register, setAlert })(Register)
