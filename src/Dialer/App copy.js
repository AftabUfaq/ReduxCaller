import React,{useEffect, useState} from 'react';
import { View, Text, TouchableOpacity,StyleSheet,NativeModules, Dimensions, DeviceEventEmitter } from 'react-native'
import { cos } from 'react-native-reanimated';
const {width, height} = Dimensions.get("screen")
import DefaultDialerModule from './src/nativemodules/SetDefaultDialer'
const {TeleModule} = NativeModules;
  const App = () => {

    const [myCall, setMyCall] = useState(null);
    useEffect(() => {
        DefaultDialerModule.isDefaultDialer((isDefaultDialer) => {
         
          if(!isDefaultDialer){
            DefaultDialerModule.setDefaultDialer((data) => {
              console.log("true",data)
            });
          }
        })
    },[])
   
    useEffect(() => {
        DeviceEventEmitter.addListener("TeleCallReceived" , (data) => {
          setMyCall(data)
          console.log("TeleCallReceived",data);
        })

        DeviceEventEmitter.addListener("TeleCallChanged", (data) => {
          setMyCall(data)
          console.log("TeleCallChanged",data);
        })

        DeviceEventEmitter.addListener('TeleCallRemoved',(data) => {
          setMyCall(data)
          console.log("TeleCallRemoved",data)
        });
    },[])

  const answercall = () => {
    nativeAnswerCall(myCall).then((data) => {
      console.log("data",data)
    }).catch((err) => {
      console.log("err",err)
    })
  }

  const DeclineCall = () => {
    nativeDeclineCall(myCall).then((data) => {
      console.log("data",data)
      setMyCall(null);
    }).catch((err) => {
      console.log("err",err)
    })
  }

  const useSpeaker = () => {
    nativeUseSpeaker(myCall).then((data) => {
      console.log("data",data)
    }).catch((err) => {
      console.log("err",err)
    })
  }

  const useEarpiece = () => {
    nativeUseEarpiece(myCall).then((data) => {
      console.log("data",data)
    }).catch((err) => {
      console.log("err",err)
    })
  }

  const Mute = () => {
    nativeMuteCall(myCall).then((data) => {
      console.log("data",data)
    }).catch((err) => {
      console.log("err",err)
    })
  }

  const unMute = () => {
    nativeUnMuteCall(myCall).then((data) => {
      console.log("data",data)
    }).catch((err) => {
      console.log("err",err)
    })
  }

  const Hold = () => {
    nativeHoldCall(myCall).then((data) => {
      console.log("data",data)
    }).catch((err) => {
      console.log("err",err)
    })
  }

  const unHold = () => {
    nativeUnholdCall(myCall).then((data) => {
      console.log("data",data)
    }).catch((err) => {
      console.log("err",err)
    })
  }



  // function  nativeMakeCall(sim, destination, callSettings, msgData) {
  //   return new Promise(function (resolve, reject) {
  //       NativeModules.TeleModule.makeCall(sim, destination, callSettings, msgData, (successful, data) => {
  //           if (successful) {
  //               if(data==true)
  //               {data={id:1}}
               
  //               resolve(new Call(data));
  //           } else {
  //               reject(data);
  //           }
  //       });
  //   });
  // }


  function nativeAnswerCall(call) {
      return new Promise((resolve, reject) => {
          NativeModules.TeleModule.answerCall(call.callId, (successful, data) => {
              if (successful) {
                  resolve(data);
              } else {
                  reject(data);
              }
          });
      });
  }

  function nativeHangupCall(call) {
      return new Promise((resolve, reject) => {
          NativeModules.TeleModule.hangupCall(call.callId, (successful, data) => {
              if (successful) {
                  resolve(data);
              } else {
                  reject(data);
              }
          });
      });
  }

  function nativeDeclineCall(call) {
      return new Promise((resolve, reject) => {
          NativeModules.TeleModule.declineCall(call.callId, (successful, data) => {
              if (successful) {
                  resolve(data);
              } else {
                  reject(data);
              }
          });
      });
  }

  function nativeHoldCall(call) {
      return new Promise((resolve, reject) => {
          NativeModules.TeleModule.holdCall(call.callId, (successful, data) => {
              if (successful) {
                  resolve(data);
              } else {
                  reject(data);
              }
          });
      });
  }

  function nativeUnholdCall(call) {
      return new Promise((resolve, reject) => {
          NativeModules.TeleModule.unholdCall(call.callId, (successful, data) => {
              if (successful) {
                  resolve(data);
              } else {
                  reject(data);
              }
          });
      });
  }

  function nativeMuteCall(call) {
      return new Promise((resolve, reject) => {
          NativeModules.TeleModule.muteCall(call.callId, (successful, data) => {
              if (successful) {
                  resolve(data);
              } else {
                  reject(data);
              }
          });
      });
  }

  function nativeUnMuteCall(call) {
      return new Promise((resolve, reject) => {
          NativeModules.TeleModule.unMuteCall(call.callId, (successful, data) => {
              if (successful) {
                  resolve(data);
              } else {
                  reject(data);
              }
          });
      });
  }

  function nativeUseSpeaker(call) {
      return new Promise((resolve, reject) => {
          NativeModules.TeleModule.useSpeaker(call.callId, (successful, data) => {
              if (successful) {
                  resolve(data);
              } else {
                  reject(data);
              }
          });
      });
  }

  function nativeUseEarpiece(call) {
      return new Promise((resolve, reject) => {
          NativeModules.TeleModule.useEarpiece(call.callId, (successful, data) => {
              if (successful) {
                  resolve(data);
              } else {
                  reject(data);
              }
          });
      });
  }


  if(myCall!==null){
    return ( 
        <View style={styles.container}>
        
          <View style={{width:width, justifyContent:"center", alignItems:"center", height:150}}>
            <Text>{myCall._remoteContact!==null?myCall._remoteContact:"Unknown Caller"}</Text>
            <Text>{myCall._remoteNumber}</Text>
          </View>
          <View style={{flexDirection:"row",width, justifyContent:"space-evenly"}}>
              <TouchableOpacity style={styles.button} onPress={() => answercall()}>
                  <Text>Answer</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => DeclineCall()}>
                  <Text>Decline</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => Record()}>
                  <Text>Record</Text>
              </TouchableOpacity>
          </View>
          <View style={{flexDirection:"row",width,marginVertical:10, justifyContent:"space-evenly"}}>
              <TouchableOpacity style={styles.button} onPress={() => Mute()}>
                  <Text>Mute</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => unMute()}>
                  <Text>unMute</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => useSpeaker()}>
                  <Text>Speaker</Text>
              </TouchableOpacity>
          </View>
         
          <View style={{flexDirection:"row",width,marginVertical:10, justifyContent:"space-evenly"}}>
              <TouchableOpacity style={styles.button} onPress={() => Hold()}>
                  <Text>Hold</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => unHold()}>
                  <Text>UnHold</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => useEarpiece()}>
                  <Text>Ear Piece</Text>
              </TouchableOpacity>
          </View>

        </View>
      )
    }else{
      return(
        <View style={styles.container}>
          <Text>Welcome to Caller App</Text>
          <Text>Greetings!!</Text>
      </View>
      )
    }
};
export default App;

const styles = StyleSheet.create({
  container:{
    flex:1, 
    justifyContent:"center", 
    alignItems:"center",
    width,height
  },
  button:{
    width:width/4,
    height:45, 
    borderRadius:10, 
    backgroundColor:"#eee", 
    alignItems:"center", 
    justifyContent:"center",
  }
})