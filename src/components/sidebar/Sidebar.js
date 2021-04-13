import React, { useContext } from 'react';
import { useMediaQuery } from 'react-responsive';

import ChatList from '../chatList/ChatList';
import Icon from '../../ui/icon/Icon';
import AppContext from '../App.context';

import styles from './Sidebar.module.scss';

const Sidebar = ({ onSelectChat, chats }) => {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });

  const currentUser = useContext(AppContext).currentUser;

  return !isTabletOrMobile ? (
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
  ) : null;
};

export default Sidebar;
