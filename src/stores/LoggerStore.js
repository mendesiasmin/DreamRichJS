'use strict';

import {ReduceStore} from 'flux/utils';
import AppDispatcher from '../AppDispatcher';

class LoggerStore extends ReduceStore {
  constructor(){ super(AppDispatcher); }

  getInitialState() { return {};}

  reduce = (state, action) => {
    console.info(`action to: ${action.actionType}`);
    console.info('action data: ', action.data);
    return state;
  }
}

export default new LoggerStore();
