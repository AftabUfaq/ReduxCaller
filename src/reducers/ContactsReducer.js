import { GET_CONTACTS } from '../constants';
    const initialState = {
        contacts: [],
    };
    
    const ContactsReducer = (state = initialState, action) => {
        switch(action.type) {
            case GET_CONTACTS:
                return {
                    ...state,
                    contacts:action.payload
                };
            default:
                return state;
        }
    }
export default ContactsReducer;