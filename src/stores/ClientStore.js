'use strict';

import {ReduceStore} from 'flux/utils';
import AppDispatcher from '../AppDispatcher';
import {postData, getData} from '../resources/Requests';
//import {Auth} from '../auth/Auth';
import ActionType from '../actions/ActionType';
import {routeMap} from '../routes/RouteMap';
// import {/*getUrl, */routeMap} from '../routes/RouteMap';

class ClientStore extends ReduceStore {

  constructor(){ super(AppDispatcher); }


  getInitialState(){
    return {
      sponse: false,
      canSubmit: false,
      stepIndex: 0,
      countries: [],
      states: [],
      addressType: [],
      active_client: {},
      dependents: {},
      key: 0,
    };
  }

  reduce = (state, action) => {
    console.log(state);
    switch (action.action) {

    case ActionType.CLIENT.SUBMIT:
      return {...state, canSubmit: true};

    case ActionType.CLIENT.POSTFORM:
      postData(
        action.route,
        action.data,
        (data) => {
          AppDispatcher.dispatch({
            action: ActionType.CLIENT.POSTFORMSUCCESS,
            data: data,
            state: action.state,
          });
        }
      );
      return {...state, canSubmit: false};

    case ActionType.CLIENT.POSTFORMSUCCESS:
      return {...state,
        [action.state]: action.data,
        stepIndex: state.stepIndex + 1
      };

    case ActionType.CLIENT.POSTMULTIFORM:
      postData(
        action.route,
        action.data,
        (data) => {
          AppDispatcher.dispatch({
            action: ActionType.CLIENT.POSTMULTIFORMSUCCESS,
            data: data,
            state: action.state,
            index: action.index
          });
        }
      );
      return {...state, canSubmit: false};

    case ActionType.CLIENT.POSTMULTIFORMSUCCESS:
      delete state.dependents[action.index];
      state.dependents[action.data.id] = action.data;
      return {...state};

    case ActionType.CLIENT.SETSTEP:
      return {...state, stepIndex: action.stepIndex};

    case ActionType.CLIENT.SUBFORM:
      postData(action.route, action.data, (e) => console.log(e));
      return state;

    case ActionType.CLIENT.STATES:
      getData(
        `${routeMap.state}?country_id=${action.country}`,
        (states) => AppDispatcher.dispatch({
          action: ActionType.CLIENT.STATESUCCESS,
          data: states,
        })
      );
      return state;

    case ActionType.CLIENT.COUNTRIES:
      return {...state, countries: action.data};

    case ActionType.CLIENT.ADDRESSTYPE:
      return {...state, addressType: action.data};

    case ActionType.CLIENT.STATESUCCESS:
      return {...state, states: action.data};

    case ActionType.CLIENT.DATAFORM:
      getData(
        routeMap.address_type,
        (addressType) => AppDispatcher.dispatch({
          action: ActionType.CLIENT.ADDRESSTYPE,
          data: addressType,
        })
      );
      getData(
        routeMap.country,
        (countries) => AppDispatcher.dispatch({
          action: ActionType.CLIENT.COUNTRIES,
          data: countries,
        })
      );
      return state;

    case ActionType.CLIENT.ADDDEPENDENT:
      state.dependents[state.key+1] = {};
      return {...state, key: state.key+1};

    case ActionType.CLIENT.REMOVEDEPENDENT:
      var {dependents} = state;
      delete dependents[action.key];
      return {...state, dependents};

    default:
      return state;
    }
  }

}

export default new ClientStore();
