import React from 'react';
import Button from '../../ui/button/Button';
import { useIsSmallScreen } from '../utils';

import styles from './Header.module.scss';

const Header = ({ selectedChat, toggleSidebar, isSidebarOpen }) => {
  const isSmallScreen = useIsSmallScreen();

  return (
    <div className={styles.container}>
      {isSmallScreen && (
        <Button isRounded icon="menu" onClick={toggleSidebar} />
      )}
      <h1>
        {isSidebarOpen && isSmallScreen ? 'TapConnect' : selectedChat.name}
      </h1>
    </div>
  );
};

export default Header;
