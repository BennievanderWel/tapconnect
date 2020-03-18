import React from 'react';

export default function Panel({ children, width, className }) {
  const widthMapping = {
    m: '400px'
  };

  const styles = {
    backgroundColor: 'white',
    boxShadow:
      '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
    padding: '24px 16px',
    width: widthMapping[width]
  };

  const classes = [className];

  return (
    <div style={styles} className={classes.join(' ')}>
      {children}
    </div>
  );
}
