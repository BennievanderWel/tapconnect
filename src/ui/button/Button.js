import React from 'react';

export default function Button({
  children,
  isFullWidth = false,
  isPrimary = false,
  className = '',
  isLoading = false,
  isOutlined = false,
  isInverted = false,
  ...props
}) {
  const styles = {
    width: isFullWidth ? '100%' : 'fit-content',
  };

  // Classname last
  const classes = ['button'];

  if (isPrimary) {
    classes.push('is-primary');
  }

  if (isLoading) {
    classes.push('is-loading');
  }

  if (isOutlined) {
    classes.push('is-outlined');
  }

  if (isInverted) {
    classes.push('is-inverted');
  }

  classes.push(className);

  return (
    <button {...props} style={styles} className={classes.join(' ')}>
      {children}
    </button>
  );
}
