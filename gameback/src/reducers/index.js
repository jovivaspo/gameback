import {combineReducers} from 'redux'
import gamesReducer from './gamesReduces'
import userReducer from './userReducer'

const reducers = combineReducers({
    user:userReducer,
    games:gamesReducer
})

export default reducers