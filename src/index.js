import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

import * as firebase from 'firebase/app';
import 'firebase/firestore';
import config from './config/firebase';

import './index.scss';

firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));
