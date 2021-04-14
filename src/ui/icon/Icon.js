import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSignInAlt,
  faTrashAlt,
  faPlusCircle,
  faUserCircle,
  faUserPlus,
  faUser,
  faPaperPlane,
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';

const icons = {
  logout: faSignInAlt,
  add: faPlusCircle,
  addUser: faUserPlus,
  user: faUser,
  delete: faTrashAlt,
  userCircle: faUserCircle,
  paperPlane: faPaperPlane,
  logout: faSignInAlt,
};

const Icon = ({ icon }) => {
  return <FontAwesomeIcon icon={icons[icon]} />;
};

export default Icon;
