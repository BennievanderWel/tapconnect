import React from 'react';

import styles from './ButtonBar.module.scss';

function ButtonBar({ children }) {
  return (
    <div className={`buttons are-small ${styles.Container}`}>{children}</div>
  );
}

export default ButtonBar;
