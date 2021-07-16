import { GET_CONTACTS } from '../constants';
import { PermissionsAndroid } from 'react-native';
import Contacts from 'react-native-contacts';

export const getContacts = () => {
    try {
      return async dispatch => {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
          {
          title: 'Call Log Example',
          message:
              'Access your call logs',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
          }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
         
        let con = await Contacts.getAll()

        dispatch({
          type: GET_CONTACTS,
          payload:con ,
        });
      }else{
        console.log("Please Grant the permission  ")
      }
      }
    } catch (error) {
         console.log("logic to handle error")
    }
  };

