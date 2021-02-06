import React from 'react';

import Login from './login/Login';
import Dashboard from './dashboard/Dashboard';

import AppContext from './App.context';
import { startListeningToLoggedInUserChanges } from '../api';

import styles from './App.module.scss';
import 'bulma/bulma.sass';

class App extends React.Component {
  state = {
    authenticated: false,
    currentUser: null,
    loading: true,
  };

  async componentDidMount() {
    /**
     * Function to update state with user and authentication data
     *
     * @param {Object} user User object
     */
    function updateState(user) {
      let state;
      if (user) {
        state = {
          currentUser: user,
          authenticated: true,
          loading: false,
        };
      } else {
        state = {
          currentUser: null,
          authenticated: false,
          loading: false,
        };
      }

      this.setState(state);
    }

    // TODO: Handle unhappy path
    startListeningToLoggedInUserChanges(updateState.bind(this));
  }

  render() {
    const { authenticated, currentUser, loading } = this.state;

    return (
      <div className={styles.Container}>
        {!authenticated && !loading && <Login />}
        {currentUser && authenticated && !loading && (
          <AppContext.Provider value={{ currentUser }}>
            <Dashboard />
          </AppContext.Provider>
        )}
      </div>
    );
  }
}

export default App;
