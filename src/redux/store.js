import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import thunk from 'redux-thunk';
import { ListReducer, permanentListReducer, ShortListReducer } from './reducers'

const initialState={};
const reducer=combineReducers({
    permanentList:permanentListReducer,
    listData:ListReducer,
    shortListData:ShortListReducer
})
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const store=createStore(reducer,initialState,composeEnhancers(applyMiddleware(thunk)))
export default store;