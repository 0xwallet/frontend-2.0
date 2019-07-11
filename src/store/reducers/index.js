import { combineReducers } from 'redux';

function login(state = {info : false,sendAgain : false,tologin : false},action){
    switch(action.type){
        case 'login' : return {...state,info : action.payload.info};
        case 'sendAgain' : return {...state,sendAgain : action.payload.sendAgain};
        case 'tologin' : return {...state,tologin : action.payload.tologin};
        default : return state
    }
}

const rootRudecer = combineReducers({
    login
})

export default rootRudecer