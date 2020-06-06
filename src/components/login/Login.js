import React, { useState } from 'react';

import Panel from '../../ui/panel/Panel';
import Input from '../../ui/input/Input';
import Button from '../../ui/button/Button';

import styles from './Login.module.scss';

export default function Login({ onLogin }) {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('rens@test.nl');
  const [password, setPassword] = useState('password');

  function handleLogin() {
    setIsLoading(true);
    onLogin(email, password).catch(() => setIsLoading(false));
  }

  function onKeyPress(e) {
    if (e.key === 'Enter') {
      handleLogin();
    }
  }

  return (
    <div className={styles.Container}>
      <h1>TapConnect</h1>
      <Panel width="m" className={styles.LoginPanel}>
        <Input
          onChange={(e) => setEmail(e.target.value)}
          onKeyPress={onKeyPress}
          value={email}
          disabled={isLoading}
          isFullWidth
          placeholder="E-mail"
          type="email"
        />
        <Input
          onChange={(e) => setPassword(e.target.value)}
          onKeyPress={onKeyPress}
          value={password}
          disabled={isLoading}
          isFullWidth
          placeholder="Wachtwoord"
          type="password"
        />

        <Button
          isPrimary
          isLoading={isLoading}
          className={styles.LoginBtn}
          onClick={handleLogin}
        >
          login
        </Button>
      </Panel>
    </div>
  );
}
