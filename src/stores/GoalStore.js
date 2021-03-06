'use strict';

import {ReduceStore} from 'flux/utils';
import AppDispatcher from '../AppDispatcher';
import ActionType from '../actions/ActionType';
import {postData, postOrPutStrategy, getData} from '../resources/Requests';
import getLastIndex from '../utils/getLastIndex';
import {/*getUrl, */routeMap} from '../routes/RouteMap';

class GoalStore extends ReduceStore {
  constructor(){ super(AppDispatcher); }

  getInitialState(){
    return {
      goals: [{index: 0}],
      goalManager: {},
      types: [],
    };
  }

  reduce = (state, action) => {
    let goals;
    switch (action.action) {

    case ActionType.GOAL.GETFORMSUCCESS:
      goals = action.data.goals.map(
        goal => { goal.index = goal.id; return goal;}
      );
      delete action.data['goals'];
      return {...state, goalManager: action.data, goals};

    case ActionType.GOAL.ADD:
      goals = state.goals.slice();
      goals.push({
        index: getLastIndex(state.goals) + 1,
        has_end_date: false,
      });
      return {...state, goals: goals};

    case ActionType.GOAL.REMOVE:
      goals = state.goals.slice();
      return {...state,
        goals: goals.filter( element => element.index !== action.index )
      };

    case ActionType.GOAL.MANAGER:
      if (!state.goalManager.id) {
        postData(
          routeMap.goal_manager,
          {},
          (data) => AppDispatcher.dispatch({
            action: ActionType.GOAL.SUCCESS,
            data: data,
            state: 'goalManager'
          })
        );
      }
      return state;

    case ActionType.GOAL.SUCCESS:
      delete action.data['goals'];
      delete action.data['goals_flow_dic'];
      delete action.data['year_init_to_year_end'];
      return {...state, [action.state]: action.data};

    case ActionType.GOAL.TYPE:
      getData(
        routeMap.goal_type,
        (data) => AppDispatcher.dispatch({
          action: ActionType.GOAL.TYPESUCCESS,
          types: data
        })
      );
      return state;

    case ActionType.GOAL.TYPESUCCESS:
      return {...state, types: action.types};

    case ActionType.GOAL.HASEND:
      goals = state.goals.slice();
      goals.find( (goal, index) => {
        if (goal.index == action.index) {
          goals[index].has_end_date = action.hasEnd;
          return true;
        }
      });
      return {...state, goals: goals};

    case ActionType.GOAL.SUBMIT:
      return {...state, canSubmit: true};

    case ActionType.GOAL.SUBFORM:
      postOrPutStrategy(
        state.goals.find( goal => action.index === goal.index),
        action.route,
        action.data,
        (data) => {
          AppDispatcher.dispatch({
            action: ActionType.GOAL.SUBFORMSUCCESS,
            data: data,
            state: action.state,
            index: action.index
          });
        }
      );
      return {...state, canSubmit: false};

    case ActionType.GOAL.SUBFORMSUCCESS:
      state.goals.find( (goal, index) => {
        if (goal.index === action.index){
          action.data.index = action.index;
          state.goals[index] = action.data;
          return true;
        }
      });
      return {...state, canSubmit: false};

    case ActionType.RESETFORMSTORES:
      return {...state, goals: [{index: 0}], goalManager: {}};

    default:
      return state;
    }
  }
}

export default new GoalStore();

