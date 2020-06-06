import React, { useContext } from 'react';

import ChatList from '../chatList/ChatList';
import Icon from '../../ui/icon/Icon';
import AppContext from '../App.context';

import styles from './Sidebar.module.scss';

const Sidebar = ({ onSelectChat, chats }) => {
  const currentUser = useContext(AppContext).currentUser;

  return (
    <div className={styles.Container}>
      <div className={styles.Header}>
        <h1>TapConnect</h1>
      </div>
      <ChatList onSelectChat={onSelectChat} chats={chats} />
      <div className={styles.UserInfo}>
        <Icon icon="userCircle" />
        {currentUser.name}
      </div>
    </div>
  );
};

export default Sidebar;
