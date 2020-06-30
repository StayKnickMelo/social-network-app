import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logOut } from '../../actions/auth';
import PropTypes from 'prop-types';




const Navbar = ({ logOut, auth: { isAuthenticated, loading } }) => {

  const guestLinks = (
    <ul>
      <li><Link to="/users">Users</Link></li>
      <li><Link to="/register">Register</Link></li>
      <li><Link to="/login">Login</Link></li>
    </ul>

  );

  const userLinks = (
    <ul>
      <li><Link to="/users">Users</Link></li>
      <li><Link to="/dashboard">Dashboard</Link></li>
      <li><Link to="/posts">Posts</Link></li>
      <li><Link onClick={logOut} to="/">Log Out <i className="fas fa-sign-out-alt">{' '}</i></Link></li>
    </ul>
  )
  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/"><i className="fas fa-people-arrows"></i> Network</Link>
      </h1>
      {/* {!loading && <Fragment>{isAuthenticated ? (userLinks) : (guestLinks)}</Fragment>} */}
      <Fragment>{isAuthenticated ? (userLinks) : (guestLinks)}</Fragment>
    </nav>
  )
}

const mapStateToProps = (state) => ({
  auth: state.auth
});

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
  logOut: PropTypes.func.isRequired,
}



export default connect(mapStateToProps, { logOut })(Navbar)
