import React from 'react';
import Button from '../../ui/button/Button';
import { useIsSmallScreen } from '../utils';

import styles from './Header.module.scss';

const Header = ({ selectedChat, toggleSidebar, isSidebarOpen }) => {
  return (
    <div className={styles.container}>
      {useIsSmallScreen() && (
        <Button isRounded icon="menu" onClick={toggleSidebar} />
      )}
      <h1>{isSidebarOpen ? 'TapConnect' : selectedChat.name}</h1>
    </div>
  );
};

export default Header;
