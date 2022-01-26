import {createStore, applyMiddleware} from 'redux'
import reducers from '../reducers'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'

const userLocalStorage = localStorage.getItem('userInfo')? JSON.parse(localStorage.getItem('userInfo')) : null
const gamesLocalStorage = localStorage.getItem('games')? JSON.parse(localStorage.getItem('games')) : null
const initialState = {
    user:{userInfo: userLocalStorage},
    games:{gamesUser:gamesLocalStorage}
}

const middleware = [thunk]

const store = createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)


export default store