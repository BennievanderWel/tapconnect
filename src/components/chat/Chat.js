import React, { useContext, useState, useEffect } from 'react';
import * as firebase from 'firebase/app';

import AppContext from '../App.context';
import Input from './../../ui/input/Input';
import Button from './../../ui/button/Button';
import Icon from './../../ui/icon/Icon';

import styles from './Chat.module.scss';

const Chat = ({ chat }) => {
  const currentUser = useContext(AppContext).currentUser;
  const [input, setInput] = useState('');

  function sendMsg() {
    if (!input) return;

    const msg = {
      chatId: chat.id,
      senderId: currentUser.uid,
      createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
      content: input,
    };

    firebase
      .firestore()
      .collection('messages')
      .doc()
      .set(msg)
      .then(() => setInput(''));
  }

  function deleteMsg(id) {
    firebase.firestore().collection('messages').doc(id).delete();
  }

  function onKeyPress(e) {
    if (e.key === 'Enter') {
      sendMsg();
    }
  }

  return (
    <div className={styles.Container}>
      <h2>{chat.name}</h2>
      <ul className={styles.Messages}>
        {chat.messages.map((msg) => (
          <li
            className={`${styles.Message} ${
              msg.senderId === currentUser.uid
                ? styles.AlignRight
                : styles.AlignLeft
            }`}
            key={msg.id}
          >
            {msg.content} <button onClick={() => deleteMsg(msg.id)}>x</button>
          </li>
        ))}
      </ul>
      <div className={styles.InputBox}>
        <Input
          isPrimary
          placeholder="Typ je bericht"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={onKeyPress}
        />
        <Button onClick={sendMsg} isPrimary>
          <Icon icon="paperPlane" />{' '}
        </Button>
      </div>
    </div>
  );
};

export default Chat;
