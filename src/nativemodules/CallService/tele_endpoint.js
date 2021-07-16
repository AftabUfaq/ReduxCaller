import { NativeModules } from 'react-native'
import { EventEmitter } from 'events'

import Call from './call'

const STATE_CONNECTING = 9;
const STATE_RINGING = 2;
const STATE_DIALING = 1;
const STATE_ACTIVE = 4;
const STATE_DISCONNECTED = 7;
const STATE_DISCONNECTING = 10;


export default class TeleEndpoint extends EventEmitter {

  constructor() {
   
    super();
    this.currentCall=null;

    this.state = {
    };

    DeviceEventEmitter.addListener('teleCallReceived', this._onCallReceived.bind(this));
    DeviceEventEmitter.addListener('teleCallChanged', this._onCallChanged.bind(this));
    DeviceEventEmitter.addListener('teleCallRemoved', this._onCallTerminated.bind(this));


  }

    _onCallReceived(data) {

      this.emit("call_received", new Call(data));
  }

    _onCallChanged(data) {

      this.emit("call_changed", new Call(data));
  }


  _onCallTerminated(data) {

      this.emit("call_terminated", new Call(data));
  }

urns {Promise}
     */
    start(configuration) {
      return new Promise(function(resolve, reject) {
          NativeModules.TeleModule.start(configuration, (successful, data) => {
              if (successful) {
                  let calls = [];

                  if (data.hasOwnProperty('calls')) {
                      for (let d of data['calls']) {
                          calls.push(new Call(d));
                      }
                  }

                  let extra = {};

                  for (let key in data) {
                      if (data.hasOwnProperty(key)  && key != "calls") {
                          extra[key] = data[key];
                      }
                  }

                  resolve({
                      calls,
                      ...extra
                  });
              } else {
                  reject(data);
              }
          });
      });
  }


      
      getCurrentCall=()=>{
    
        NativeModules.TeleModule.getCurrentCall()
      };
          
      //outgoing
      declineCall=(call)=>{
        NativeModules.TeleModule.declineCall()};

      //incoming
      answerCall=(call)=>{ NativeModules.TeleModule.answerCall()};
      hangupCall=(call)=>{ NativeModules.TeleModule.hangupCall()};

      sendEnvelope=(str)=>{ NativeModules.TeleModule.sendEnvelope(str)};


     
  Rec = async (data) => {
  

    if (data.action === 'TeleService') {
    
      if (data.extra1s === 'onCallAdded') {
       
        this.currentCall=new Call({remoteUri:data.extra3s,creationTime:data.extra1l});
        this.currentCall.state='PJSIP_INV_STATE_NULL';
        this.currentCall._state=this.currentCall.state;
      }

      if ((this.currentCall==null)&&((data.extra1s === 'getCurrentCall'))&&(data.extra1i!=0))
      {
        this.currentCall = new Call({remoteUri:data.extra3s,creationTime:data.extra1l});
      }

      if (this.currentCall!=null)
      if ((data.extra1s === 'getCurrentCall')||(data.extra1s === 'onStateChanged')||(data.extra1s === 'onCallAdded')) {
        if (data.extra1i === STATE_CONNECTING) {
          this.currentCall.state='PJSIP_INV_STATE_CALLING';
          this.currentCall._state=this.currentCall.state;
          this.currentCall.incoming=false;
        }
        if (data.extra1i === STATE_RINGING) {
          this.currentCall.state='PJSIP_INV_STATE_INCOMING';
          this.currentCall._state=this.currentCall.state;
          this.currentCall.incoming=true;
        }

        if (data.extra1i === STATE_DIALING) {
          this.currentCall.state='PJSIP_INV_STATE_EARLY';
          this.currentCall._state=this.currentCall.state;
        }
        if (data.extra1i === STATE_ACTIVE) {
          this.currentCall.connectTime=data.extra2l;
          this.currentCall.state='PJSIP_INV_STATE_CONFIRMED';
          this.currentCall._state=this.currentCall.state;
        }
        if (data.extra1i === STATE_DISCONNECTED) {
          this.currentCall.state='PJSIP_INV_STATE_DISCONNECTED';
          this.currentCall._state=this.currentCall.state;
          this._lastReason='PJSIP_SC_OK';
        }
        if (data.extra1i === STATE_DISCONNECTING) {
          //TODO
          this.currentCall.state='PJSIP_INV_STATE_DISCONNECTED';
          this.currentCall._state=this.currentCall.state;
          this._lastReason='PJSIP_SC_OK';
        }



      }

        if (data.extra1s === 'onCallAdded') {
        
          this.emit("call_received", this.currentCall);
        }  
        
      if (data.extra1s === 'onCallRemoved') {
       
        this.currentCall=null;
        this.emit("call_terminated", this.currentCall);
      }

      if ((data.extra1s === 'onStateChanged')) {
       
        this.emit("call_changed", this.currentCall);
      }
      if ((data.extra1s === 'getCurrentCall')) {
       
        this.emit("call_changed", this.currentCall);
      }

    }

   }

}


