import React from 'react';
import styles from './Loader.module.scss';

function Loader() {
  return (
    <div className={styles.Container}>
      <div className="loader" />
    </div>
  );
}

export default Loader;
