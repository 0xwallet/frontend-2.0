import { combineReducers } from 'redux';

function login(state = {info : false},action){
    switch(action.type){
        case 'login' : return {...state,info : action.payload.info}
        default : return state
    }
}

const rootRudecer = combineReducers({
    login
})

export default rootRudecer