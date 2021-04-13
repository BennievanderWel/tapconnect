import React from 'react';

import Chat from '../chat/Chat';
import Sidebar from '../sidebar/Sidebar';

import AppContext from '../App.context';

import styles from './Dashboard.module.scss';
import { deleteMsg, getChatsForUser } from '../../api';

class Dashboard extends React.Component {
  static contextType = AppContext;

  state = {
    currentUser: this.context.currentUser,
    chats: {},
    selectedChatId: null,
  };

  componentDidMount() {
    function updateState(chats) {
      // If no chat is selected, select the first chat
      this.setState({
        chats,
        selectedChatId: this.state.selectedChatId || Object.keys(chats)[0],
      });
    }

    getChatsForUser(this.context.currentUser.uid, updateState.bind(this));
  }

  deleteMessageFromChat(msgId) {
    // TODO: Ugly full state overwrite
    deleteMsg(msgId);
    const newChats = { ...this.state.chats };
    newChats[this.state.selectedChatId].messages = newChats[
      this.state.selectedChatId
    ].messages.filter((m) => m.id !== msgId);
    this.setState({ chats: newChats });
  }

  render() {
    const { chats, selectedChatId } = this.state;

    return (
      <div className={styles.Container}>
        <Sidebar
          onSelectChat={(chat) => this.setState({ selectedChatId: chat.id })}
          chats={chats}
        />
        {selectedChatId && (
          <Chat
            onDelete={this.deleteMessageFromChat.bind(this)}
            chatId={chats[selectedChatId].id}
            messages={chats[selectedChatId].messages}
            chatName={chats[selectedChatId].name}
          />
        )}
      </div>
    );
  }
}

export default Dashboard;
