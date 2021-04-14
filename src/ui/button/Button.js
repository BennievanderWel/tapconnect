import React from 'react';
import Icon from '../icon/Icon';

import styles from './Button.module.scss';

export default function Button({
  children,
  icon = null,
  isFullWidth = false,
  isPrimary = false,
  className = '',
  isLoading = false,
  isOutlined = false,
  isInverted = false,
  isDisabled = false,
  isRounded = false,
  ...props
}) {
  const style = {
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

  if (isRounded) {
    classes.push('is-rounded');
  }

  classes.push(styles.Container);
  classes.push('henk');
  classes.push(className);
  return (
    <button
      {...props}
      style={style}
      disabled={isDisabled}
      className={classes.join(' ')}
    >
      {icon && (
        <span className={children ? styles.Icon : ''}>
          <Icon icon={icon} />
        </span>
      )}
      {children}
    </button>
  );
}
