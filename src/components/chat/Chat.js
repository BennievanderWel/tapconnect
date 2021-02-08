import React, { useContext, useState, useRef, useEffect } from 'react';
import * as firebase from 'firebase/app';

import AppContext from '../App.context';
import Input from './../../ui/input/Input';
import Button from './../../ui/button/Button';
import Icon from './../../ui/icon/Icon';

import styles from './Chat.module.scss';
import { deleteMsg, sendMsg } from '../../api';

const Chat = ({ chatId, messages, chatName }) => {
  const currentUser = useContext(AppContext).currentUser;
  const [input, setInput] = useState('');
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [isScrolledToTop, setIsScrolledToTop] = useState(false);
  const [isScrollable, setIsScrollable] = useState(false);
  const messagesRef = useRef(null);

  useEffect(() => {
    const el = messagesRef.current;

    // Enable auto scroll if the chatBox is scrolled down 100%
    function trackScrolling() {
      setIsAutoScrolling(el.scrollHeight - el.offsetHeight === el.scrollTop);
      setIsScrolledToTop(el.scrollTop === 0);
      setIsScrollable(el.scrollHeight - el.offsetHeight > 0);
    }

    el.addEventListener('scroll', trackScrolling);
    return () => el.removeEventListener('scroll', trackScrolling);
  });

  useEffect(() => {
    if (isAutoScrolling) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  });

  function send() {
    // TODO: Let the backend add the timestamp
    const msg = {
      chatId: chatId,
      senderId: currentUser.uid,
      createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
      content: input,
    };

    // TODO: Handle error case
    sendMsg(msg).then(() => setInput(''));
  }

  function onKeyPress(e) {
    if (e.key === 'Enter') {
      sendMsg();
    }
  }

  return (
    <div className={styles.Container}>
      <h2>{chatName}</h2>
      {isScrollable && !isScrolledToTop && <div className={styles.ShadowTop} />}
      <ul className={styles.Messages} ref={messagesRef}>
        {messages.length > 0 ? (
          messages.map((msg) => (
            <li
              className={`${styles.Message} ${
                msg.senderId === currentUser.uid
                  ? styles.AlignRight
                  : styles.AlignLeft
              }`}
              key={msg.id}
            >
              {msg.content}
              <button
                className={styles.DeleteBtn}
                key={null}
                onClick={() => deleteMsg(chatId)}
              >
                x
              </button>
            </li>
          ))
        ) : (
          <li className={`${styles.Message} ${styles.Center}`}>
            Je hebt nog geen berichten. Typ je eerste bericht..
          </li>
        )}
      </ul>
      {isScrollable && !isAutoScrolling && (
        <div className={styles.ShadowBottom} />
      )}
      <div className={styles.InputBox}>
        <Input
          isPrimary
          placeholder="Typ je bericht"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={onKeyPress}
        />
        <Button onClick={sendMsg} isPrimary isDisabled={!input}>
          <Icon icon="paperPlane" />{' '}
        </Button>
      </div>
    </div>
  );
};

export default Chat;
