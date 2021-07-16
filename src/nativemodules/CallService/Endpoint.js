import React, { DeviceEventEmitter, NativeModules } from 'react-native';
import { EventEmitter } from 'events'
import Call from './Call'

export default class Endpoint extends EventEmitter {

    constructor() {
        super();
        DeviceEventEmitter.addListener('TeleCallReceived', this._onCallReceived.bind(this));
        DeviceEventEmitter.addListener('TeleCallChanged', this._onCallChanged.bind(this));
        DeviceEventEmitter.addListener('TeleCallTerminated', this._onCallTerminated.bind(this));
        DeviceEventEmitter.addListener('TeleCallScreenLocked', this._onCallScreenLocked.bind(this));
        DeviceEventEmitter.addListener('TeleMessageReceived', this._onMessageReceived.bind(this));
        DeviceEventEmitter.addListener('TeleConnectivityChanged', this._onConnectivityChanged.bind(this));
    }
    start(configuration) {
        return new Promise(function (resolve, reject) {

            if (configuration.ReplaceDialer == true) {
               
            }
            if (NativeModules.TeleModule == null) {
                throw new Error(`react-native-tele: NativeModule.TeleModule is null. To fix this issue try these steps:`);
            }


            NativeModules.TeleModule.start(configuration, (successful, data) => {
                if (successful) {
                    let accounts = [];
                    let calls = [];
           
                    if (data.hasOwnProperty('accounts')) {
                        for (let d of data['accounts']) {
                            accounts.push(d);
                        }
                    }

                    if (data.hasOwnProperty('calls')) {
                        for (let d of data['calls']) {
                            calls.push(new Call(d));
                        }
                    }

                    let extra = {};

                    for (let key in data) {
                        if (data.hasOwnProperty(key) && key != "accounts" && key != "calls") {
                            extra[key] = data[key];
                        }
                    }

                    resolve({
                        accounts,
                        calls,
                        ...extra
                    });
                } else {
                    reject(data);
                }
            });
        });
    }

    makeCall(sim, destination, callSettings, msgData) {
        return new Promise(function (resolve, reject) {
            NativeModules.TeleModule.makeCall(sim, destination, callSettings, msgData, (successful, data) => {
                if (successful) {
                    if(data==true)
                    {data={id:1}}
                   
                    resolve(new Call(data));
                } else {
                    reject(data);
                }
            });
        });
    }


    answerCall(call) {
        return new Promise((resolve, reject) => {
            NativeModules.TeleModule.answerCall(call.getId(), (successful, data) => {
                if (successful) {
                    resolve(data);
                } else {
                    reject(data);
                }
            });
        });
    }

    hangupCall(call) {
        return new Promise((resolve, reject) => {
            NativeModules.TeleModule.hangupCall(call.getId(), (successful, data) => {
                if (successful) {
                    resolve(data);
                } else {
                    reject(data);
                }
            });
        });
    }

    declineCall(call) {
        return new Promise((resolve, reject) => {
            NativeModules.TeleModule.declineCall(call.getId(), (successful, data) => {
                if (successful) {
                    resolve(data);
                } else {
                    reject(data);
                }
            });
        });
    }

    holdCall(call) {
        return new Promise((resolve, reject) => {
            NativeModules.TeleModule.holdCall(call.getId(), (successful, data) => {
                if (successful) {
                    resolve(data);
                } else {
                    reject(data);
                }
            });
        });
    }

    unholdCall(call) {
        return new Promise((resolve, reject) => {
            NativeModules.TeleModule.unholdCall(call.getId(), (successful, data) => {
                if (successful) {
                    resolve(data);
                } else {
                    reject(data);
                }
            });
        });
    }

    muteCall(call) {
        return new Promise((resolve, reject) => {
            NativeModules.TeleModule.muteCall(call.getId(), (successful, data) => {
                if (successful) {
                    resolve(data);
                } else {
                    reject(data);
                }
            });
        });
    }
    unMuteCall(call) {
        return new Promise((resolve, reject) => {
            NativeModules.TeleModule.unMuteCall(call.getId(), (successful, data) => {
                if (successful) {
                    resolve(data);
                } else {
                    reject(data);
                }
            });
        });
    }
    useSpeaker(call) {
        return new Promise((resolve, reject) => {
            NativeModules.TeleModule.useSpeaker(call.getId(), (successful, data) => {
                if (successful) {
                    resolve(data);
                } else {
                    reject(data);
                }
            });
        });
    }

    useEarpiece(call) {
        return new Promise((resolve, reject) => {
            NativeModules.TeleModule.useEarpiece(call.getId(), (successful, data) => {
                if (successful) {
                    resolve(data);
                } else {
                    reject(data);
                }
            });
        });
    }

    _onConnectivityChanged(data) {

        this.emit("connectivity_changed", new Account(data));
    }


    _onRegistrationChanged(data) {
   
        this.emit("registration_changed", new Account(data));
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

    _onCallScreenLocked(lock) {
        this.emit("call_screen_locked", lock);
    }

    _onMessageReceived(data) {
        this.emit("message_received", new Message(data));
    }
    _onConnectivityChanged(available) {
        this.emit("connectivity_changed", available);
    }

}