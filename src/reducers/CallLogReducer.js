import { GET_CALL_LOGS } from '../constants';
const initialState = {
    calllogs: []
};
const CallLogReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_CALL_LOGS:
            return {
                ...state,
                calllogs:action.payload
            };
        default:
            return state;
        }
    }
export default CallLogReducer;