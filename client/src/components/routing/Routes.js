import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Alert from '../layout/Alert';


import NotFound from '../layout/NotFound';


// User Auth
import Login from '../auth/Login';
import Register from '../auth/Register';
import PrivateRoute from './PrivateRoute';
import Dashboard from '../dashboard/Dashboard';

// Profile
import CreateProfile from '../profile-form/CreateProfile';
import EditProfile from '../profile-form/EditProfile';
import AddExperience from '../profile-form/AddExperience';
import AddEducation from '../profile-form/AddEducation';
import Profiles from '../profiles/Profiles';
import Profile from '../profiles/Profile';

// Post
import Posts from '../posts/Posts';
import Post from '../post/Post';

const Routes = () => {
  return (
    <div className="container">
      <Alert />
      <Switch>
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/users' component={Profiles} />
        <Route exact path='/users/:id' component={Profile} />
        <PrivateRoute exact path='/dashboard' component={Dashboard} />
        <PrivateRoute exact path='/create-profile' component={CreateProfile} />
        <PrivateRoute exact path='/edit-profile' component={EditProfile} />
        <PrivateRoute exact path='/add-experience' component={AddExperience} />
        <PrivateRoute exact path='/add-education' component={AddEducation} />
        <PrivateRoute exact path='/posts' component={Posts} />
        <PrivateRoute exact path='/posts/:id' component={Post} />
        <Route component={NotFound} />
      </Switch>
    </div>
  )
}

export default Routes
