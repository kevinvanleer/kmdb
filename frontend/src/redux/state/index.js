import { combineReducers } from 'redux';

import core from './core/index.js';
import requests from './requests/index.js';

export default combineReducers({ core, requests });
