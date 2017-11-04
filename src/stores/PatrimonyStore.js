'use strict';

import {ReduceStore} from 'flux/utils';
import AppDispatcher from '../AppDispatcher';
import {/*postData,*/ postOrPutStrategy} from '../resources/Requests';
import ActionType from '../actions/ActionType';
//import {routeMap} from '../routes/RouteMap';
import getLastIndex from '../utils/getLastIndex';

class PatrimonyStore extends ReduceStore {
  constructor(){ super(AppDispatcher); }

  getInitialState(){
    return {
      patrimony: {},
      canSubmit: false,
      stepIndex: 0,
      income: [{index: 0}],
    };
  }

  reduce = (state, action) => {
    let arr;
    let item;
    switch (action.action) {

    case ActionType.PATRIMONY.GETFORMSUCCESS:
      arr = action.data.incomes.map( item => {
        item.index = item.id;
        return item;
      });
      return {...state, patrimony: action.data, income: arr};

    case ActionType.PATRIMONY.SUBMIT:
      return {...state, canSubmit: action.canSubmit};

    case ActionType.PATRIMONY.POSTFORM:
      postOrPutStrategy(
        state[action.state],
        action.route,
        action.data,
        (data) => {
          AppDispatcher.dispatch({
            action: ActionType.PATRIMONY.POSTFORMSUCCESS,
            data: data,
            state: action.state
          });
        }
      );
      return {...state, canSubmit: false};

    case ActionType.PATRIMONY.POSTFORMSUCCESS:
      return {...state,
        [action.state]: action.data,
        stepIndex: state.stepIndex + 1};

    case ActionType.PATRIMONY.POSTMULTIFORM:
      item = state[action.state].find( item => item.index === action.index);
      postOrPutStrategy(
        item,
        action.route,
        action.data,
        (data) => {
          AppDispatcher.dispatch({
            action: ActionType.PATRIMONY.POSTMULTIFORMSUCCESS,
            data: data,
            state: action.state,
            index: action.index
          });
        }
      );
      return {...state, canSubmit: false};

    case ActionType.PATRIMONY.POSTMULTIFORMSUCCESS:
      state[action.state].find( (item, index) => {
        if (item.index === action.index){
          action.data.index = action.index;
          state[action.state][index] = action.data; // same state.incomes[idx]
          return true;
        }
      });
      return {...state};

    case ActionType.RESETFORMSTORES:
      return {...state, patrimony: {}};

    case ActionType.PATRIMONY.SETSTEP:
      return {...state, stepIndex: action.stepIndex};

    case ActionType.PATRIMONY.ADD:
      arr = state[action.state].slice();
      arr.push({index: getLastIndex(arr) + 1});
      return {...state, [action.state]: arr};

    case ActionType.PATRIMONY.REMOVE:
      arr = state[action.state].filter( item => item.index !== action.index );
      return {...state, [action.state]: arr};

    default:
      return state;
    }
  }
}

export default new PatrimonyStore();
