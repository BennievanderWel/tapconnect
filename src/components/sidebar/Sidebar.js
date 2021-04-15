import React, { useContext } from 'react';
import { useMediaQuery } from 'react-responsive';
import classNames from 'classnames';

import ChatList from '../chatList/ChatList';
import Icon from '../../ui/icon/Icon';
import AppContext from '../App.context';

import styles from './Sidebar.module.scss';
import Button from '../../ui/button/Button';
import { logoutUser } from '../../api';
import { useIsSmallScreen } from '../utils';

const Sidebar = ({ onSelectChat, chats, toggle }) => {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1000px)' });

  const currentUser = useContext(AppContext).currentUser;

  return (
    <div
      className={classNames(styles.Container, {
        [styles.ContainerMobile]: useIsSmallScreen(),
      })}
    >
      <ChatList onSelectChat={onSelectChat} chats={chats} />
      {/* <div className={styles.UserInfo}>
        <Icon icon="userCircle" />
        {currentUser.name}
      </div>
      <Button onClick={logoutUser} isOutlined isFullWidth icon="logout">
        Uitloggen
      </Button> */}
    </div>
  );
};

export default Sidebar;
