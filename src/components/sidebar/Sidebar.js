import React, { useContext } from 'react';
import { useMediaQuery } from 'react-responsive';

import ChatList from '../chatList/ChatList';
import Icon from '../../ui/icon/Icon';
import AppContext from '../App.context';

import styles from './Sidebar.module.scss';
import Button from '../../ui/button/Button';
import { logoutUser } from '../../api';

const Sidebar = ({ onSelectChat, chats, toggle }) => {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1000px)' });

  const currentUser = useContext(AppContext).currentUser;

  return (
    <div className={styles.Container}>
      <div className={styles.Header}>
        <h1>TapConnect</h1>
        <Button isRounded icon="chevronLeft" onClick={toggle} />
      </div>
      <ChatList onSelectChat={onSelectChat} chats={chats} />
      <div className={styles.UserInfo}>
        <Icon icon="userCircle" />
        {currentUser.name}
      </div>
      <Button onClick={logoutUser} isOutlined isFullWidth icon="logout">
        Uitloggen
      </Button>
    </div>
  );
};

export default Sidebar;
