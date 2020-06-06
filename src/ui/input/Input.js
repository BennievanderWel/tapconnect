import React from 'react';

export default function Input({ id, label, className, isPrimary, ...props }) {
  const classes = ['input'];

  if (isPrimary) {
    classes.push('is-primary');
  }

  classes.push(className);

  return <input {...props} className={classes.join(' ')} id={id} />;
}
