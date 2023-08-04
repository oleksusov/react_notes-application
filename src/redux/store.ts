import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore } from 'redux';
import reducer from './reducer';

const store = createStore(reducer, composeWithDevTools());

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
