import React,{useEffect} from 'react';
import { View, Text } from 'react-native';
import DefaultDialerModule from './src/nativemodules/SetDefaultDialer'
  const App = () => {
    useEffect(() => {
        DefaultDialerModule.isDefaultDialer((data) => {
          if(data){
           console.log(data,"data")
          }else{
            DefaultDialerModule.setDefaultDialer((data) => {
              console.log(data)
           })
          }
        })
    },[])
  return ( 
      <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
        <Text>App.js</Text>
      </View>
    )
};
export default App;