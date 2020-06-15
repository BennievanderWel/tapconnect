import React from 'react';

import styles from './ChatList.module.scss';
import Icon from '../../ui/icon/Icon';

export default function ChatList({ chats, onSelectChat }) {
  return (
    <div className={styles.Container}>
      <ul>
        {Object.values(chats).map((chat) => (
          <li key={chat.id}>
            <button
              className={styles.ChatItem}
              onClick={() => onSelectChat(chat)}
            >
              <Icon icon="user" />
              {chat.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
