import React from 'react';
import * as firebase from 'firebase/app';
import 'firebase/auth';

import Login from './login/Login';
import Dashboard from './dashboard/Dashboard';

import AppContext from './App.context';

import styles from './App.module.scss';
import 'bulma/bulma.sass';

class App extends React.Component {
  state = {
    authenticated: false,
    currentUser: null,
    loading: true,
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged((userDoc) => {
      if (userDoc) {
        firebase
          .firestore()
          .collection('users')
          .doc(userDoc.uid)
          .get()
          .then((user) => {
            this.setState({
              currentUser: { ...user.data(), uid: userDoc.uid },
              authenticated: true,
              loading: false,
            });
          });
      } else {
        this.setState({
          currentUser: null,
          authenticated: false,
          loading: false,
        });
      }
    });
  }

  login(email, password) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  logout() {
    firebase.auth().signOut();
  }

  render() {
    const { authenticated, currentUser, loading } = this.state;

    return (
      <div className={styles.Container}>
        {!authenticated && !loading && (
          <Login onLogin={this.login.bind(this)} />
        )}
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
