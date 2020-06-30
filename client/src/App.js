import React, { Fragment, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

// Components

// Layout
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';

import Routes from './components/routing/Routes';



// Auth
import setAuthToken from './utils/auth';


// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';

if (localStorage.getItem('token')) {
  setAuthToken(localStorage.getItem('token'));
}


function App() {


  useEffect(() => {
    store.dispatch(loadUser());
    // eslint-disable-next-line
  }, []);


  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Switch>
          <Route exact path='/' component={Landing} />
          <Route component={Routes}/>

          </Switch>
          
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
