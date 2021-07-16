import { GET_CALL_LOGS } from '../constants';
import { PermissionsAndroid } from 'react-native';
import CallLogs from 'react-native-call-log'
    export const GetCallLogs = () =>  {
        try {
            return async dispatch => { 
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.READ_CALL_LOG,
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
                   
                  let logs = await CallLogs.loadAll();
                  dispatch({
                    type: GET_CALL_LOGS,
                    payload:logs ,
                  });
                } else {
                    console.log('Call Log permission denied');
                }
            }
            
        }catch (e) {
            console.log(e);
        }
    }