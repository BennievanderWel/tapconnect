import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSignInAlt,
  faTrashAlt,
  faPlusCircle,
  faUserPlus
} from '@fortawesome/free-solid-svg-icons';

const icons = {
  logout: faSignInAlt,
  add: faPlusCircle,
  addUser: faUserPlus,
  delete: faTrashAlt
};

function Icon({ icon }) {
  return <FontAwesomeIcon icon={icons[icon]} />;
}

export default Icon;
