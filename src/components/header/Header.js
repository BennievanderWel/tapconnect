import React, { useContext } from 'react';

import Button from '../../ui/button/Button';

import AppContext from '../App.context';

import styles from './Header.module.scss';

export default function Header({ onLogout }) {
  const currentUser = useContext(AppContext).currentUser;

  return (
    <div className={styles.Container}>
      <h1>TeamPoint</h1>
      <ul>
        <li>{currentUser.name}</li>
        <li>
          <Button onClick={onLogout}>logout</Button>
        </li>
      </ul>
    </div>
  );
}
