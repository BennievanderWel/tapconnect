import React from 'react';
import classNames from 'classnames';

function Modal({
  show,
  onClose,
  onSuccess,
  successBtnText,
  title,
  isSubmitting,
  children
}) {
  return (
    <div className={classNames('modal', { 'is-active': show })}>
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">{title}</p>
          <button
            className="delete"
            onClick={onClose}
            aria-label="close"
          ></button>
        </header>
        <section className="modal-card-body">{children}</section>
        <footer className="modal-card-foot">
          <button
            disabled={isSubmitting}
            className={`button is-success ${isSubmitting ? 'is-loading' : ''}`}
            onClick={onSuccess}
          >
            {successBtnText}
          </button>
          <button disabled={isSubmitting} className="button" onClick={onClose}>
            Cancel
          </button>
        </footer>
      </div>
    </div>
  );
}

export default Modal;
