import React from 'react';

import Chat from '../chat/Chat';
import Sidebar from '../sidebar/Sidebar';

import AppContext from '../App.context';

import styles from './Dashboard.module.scss';
import { getChatsForUser } from '../../api';

class Dashboard extends React.Component {
  static contextType = AppContext;

  state = {
    currentUser: this.context.currentUser,
    chats: {},
    selectedChatId: null,
  };

  componentDidMount() {
    function updateState(chats) {
      // For now, we just select the first chat
      this.setState({ chats, selectedChatId: Object.keys(chats)[0] });
    }

    getChatsForUser(this.context.currentUser.uid, updateState.bind(this));
  }

  render() {
    const { chats, selectedChatId } = this.state;

    return (
      <div className={styles.Container}>
        <Sidebar
          onSelectChat={(chat) => this.setState({ selectedChatId: chat.id })}
          chats={chats}
        />
        {selectedChatId && <Chat chat={chats[selectedChatId]} />}
      </div>
    );
  }
}

export default Dashboard;
