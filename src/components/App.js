import React from 'react';
import Backendless from 'backendless';

import Login from './login/Login';
import Header from './header/Header';
import Dashboard from './dashboard/Dashboard';

import AppContext from './App.context';

import styles from './App.module.scss';
import 'bulma/bulma.sass';

class App extends React.Component {
  state = {
    authenticated: false,
    currentUser: null
  };

  constructor() {
    super();
    Backendless.initApp(
      '6210F59C-7E01-5C03-FFB0-E54E129DC300',
      'FAD4019F-AB75-403B-86F8-F981DF388724'
    );
  }

  componentDidMount() {
    Backendless.UserService.getCurrentUser().then(user => {
      if (user) {
        this.setState({ currentUser: user, authenticated: true });
      }
    });
  }

  login(email, password) {
    return Backendless.UserService.login(email, password, true).then(user => {
      this.setState({ currentUser: user, authenticated: true });
    });
  }

  logout() {
    Backendless.UserService.logout()
      .then(() => this.setState({ authenticated: false, currentUser: null }))
      .catch(console.log);
  }

  getMessages() {
    const messagesTableRT = Backendless.Data.of('Messages').rt();

    const onObjectCreate = message =>
      this.setState(prevState => ({
        messages: [...prevState.messages, message]
      }));
    const onError = error => console.log('An error has occurred -', error);

    messagesTableRT.addCreateListener(onObjectCreate, onError);

    const queryBuilder = Backendless.DataQueryBuilder.create();
    queryBuilder.setSortBy(['created ASC']);
    Backendless.Data.of('Messages')
      .find(queryBuilder)
      .then(messages => {
        this.setState({ messages });
      });
  }

  submitMessage(e) {
    e.preventDefault();

    const { message, currentUser } = this.state;
    Backendless.Data.of('Messages')
      .save({
        content: message,
        from: currentUser.objectId
      })
      .then(() => {
        this.setState({ message: '' });
      })
      .catch(console.log);
  }

  render() {
    const { authenticated, currentUser } = this.state;

    return (
      <div className={styles.Container}>
        {!authenticated && <Login onLogin={this.login.bind(this)} />}
        {currentUser && authenticated && (
          <AppContext.Provider value={{ currentUser }}>
            <Header onLogout={this.logout.bind(this)} />
            <Dashboard />
          </AppContext.Provider>
        )}
      </div>
    );
  }
}

export default App;
