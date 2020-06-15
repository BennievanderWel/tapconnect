import React from 'react';
import * as firebase from 'firebase/app';

import AppContext from '../App.context';
import Chat from '../chat/Chat';
import Sidebar from '../sidebar/Sidebar';

import styles from './Dashboard.module.scss';

class Dashboard extends React.Component {
  static contextType = AppContext;

  state = {
    currentUser: this.context.currentUser,
    chats: {},
    selectedChatId: null,
  };

  componentDidMount() {
    const { currentUser } = this.state;
    firebase
      .firestore()
      .collection('chats')
      .where('members', 'array-contains', currentUser.uid)
      .get()
      .then((snap) => {
        const updatedChats = {}; // { chatId: { chatData } }
        const idMap = {}; // { userId: chatId}
        snap.forEach((doc) => {
          const data = doc.data();
          const friendId = data.members.filter((i) => i !== currentUser.uid)[0];
          idMap[friendId] = doc.id;
        });

        firebase
          .firestore()
          .collection('users')
          .where(
            firebase.firestore.FieldPath.documentId(),
            'in',
            Object.keys(idMap)
          )
          .get()
          .then((snap) => {
            snap.forEach((doc) => {
              const chatId = idMap[doc.id];
              updatedChats[chatId] = {
                name: doc.data().name,
                id: chatId,
                messages: [],
              };
            });

            firebase
              .firestore()
              .collection('messages')
              .where('chatId', 'in', Object.keys(updatedChats))
              .onSnapshot((snap) => {
                const chatMessagesMap = {};
                snap.docChanges().forEach((data) => {
                  if (data.type === 'added') {
                    const doc = data.doc;
                    const chatId = doc.data().chatId;
                    const msg = doc.data();
                    msg.id = doc.id;
                    if (chatId in chatMessagesMap) {
                      chatMessagesMap[chatId].push(msg);
                    } else {
                      chatMessagesMap[chatId] = [msg];
                    }
                  }
                });

                Object.keys(chatMessagesMap).forEach((chatId) => {
                  updatedChats[chatId].messages = [
                    ...updatedChats[chatId].messages,
                    ...chatMessagesMap[chatId].sort(
                      (a, b) => a.createdAt - b.createdAt
                    ),
                  ];
                });

                this.setState({
                  chats: updatedChats,
                  selectedChatId: Object.keys(updatedChats)[0],
                });
              });
          });
      });
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
