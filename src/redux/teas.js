import * as ActionTypes from './ActionTypes';

export const Teas = (state = {
        isLoading: true,
        errMess: null,
        teas: []
    }, action) => {
    switch (action.type) {
        case ActionTypes.ADD_TEAS:
            return {...state, isLoading: false, errMess: null, teas: action.payload};

        case ActionTypes.TEAS_LOADING:
            return {...state, isLoading: true, errMess: null, teas: []};

        case ActionTypes.TEAS_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
            return state;
    }
};