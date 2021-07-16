import { createStore, combineReducers,applyMiddleware} from 'redux';
import ContactsReducer from '../reducers/ContactsReducer';
import CallLogReducer from '../reducers/CallLogReducer';
import thunk from 'redux-thunk';
    const rootReducer = combineReducers({
            ContactsReducer,
            CallLogReducer
    });
export const store =  createStore(rootReducer,applyMiddleware(thunk));