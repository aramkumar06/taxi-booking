import thunk from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { rides } from './rides.reducer';
import { socket } from './socket.reducer';

const initialState = {
  rides: [], socket: null,
};
const reducer = combineReducers({
  socket,
  rides,
});

export const store = createStore(reducer, initialState, applyMiddleware(thunk));
