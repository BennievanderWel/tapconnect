import React from 'react';
import Backendless from 'backendless';
import styles from './Dashboard.module.scss';
import FriendList from '../friendList/FriendList';

class Dashboard extends React.Component {
  state = {
    company: null,
    newTeamName: '',
    teams: [],
    selectedTeam: null
  };

  // componentDidMount() {
  //   Backendless.Data.of("Company")
  //     .findFirst()
  //     .then(company => this.setState({ company }))
  //     .catch(console.log);
  //   Backendless.Data.of("Team")
  //     .find()
  //     .then(teams => this.setState({ teams }))
  //     .catch(console.log);
  // }

  createTeam = () => {
    const { newTeamName, teams } = this.state;
    Backendless.Data.of('Team')
      .save({ name: newTeamName })
      .then(newTeam => {
        Backendless.Data.of('Team')
          .findFirst({ objectId: newTeam.objectId })
          .then(team => {
            this.setState({ teams: [...teams, team], newTeamName: '' });
          });
      })
      .catch(console.log);
  };

  createPosition = () => {
    const { newPositionName, selectedTeam } = this.state;
    Backendless.Data.of('Position')
      .save({ name: newPositionName, team: selectedTeam.objectId })
      .then(newPosition => {
        this.setState({
          selectedTeam: {
            ...selectedTeam,
            positions: [...selectedTeam.positions, newPosition]
          },
          newPositionName: ''
        });
      })
      .catch(console.log);
  };

  handleTeamNameChange = e => {
    this.setState({ newTeamName: e.target.value });
  };

  handlePositionNameChange = e => {
    this.setState({ newPositionName: e.target.value });
  };

  render() {
    return (
      <div className={styles.Container}>
        <FriendList />
      </div>
    );
  }
}

export default Dashboard;
