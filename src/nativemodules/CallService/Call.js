export default class Call {

    constructor({
            id, callId, accountId,
            localContact, localUri, remoteContact, remoteUri,
            state, stateText, held, muted, speaker,
            connectDuration, totalDuration,
            remoteOfferer, remoteAudioCount, remoteVideoCount, audioCount, videoCount,
            lastStatusCode, lastReason, media, provisionalMedia, creationTime, connectTime, 
            details, hashCode, extras,
            connectTimeMillis,creationTimeMillis,disconnectCause,direction,
            simSlot,simSlot1,simSlot2
            
        }) {
        
            
        //console.log(details);
        let remoteNumber = null;
        let remoteName = null;

        if (remoteUri) {
            let match = remoteUri.match(/"([^"]+)" <sip:([^@]+)@/);

            if (match) {
                remoteName = match[1];
                remoteNumber = match[2];
            } else {
                match = remoteUri.match(/sip:([^@]+)@/);

                if (match) {
                    remoteNumber = match[1];
                }
            }

                match = remoteUri.match(/tel:([^@]+)/);

                if (match) {
                    remoteNumber = decodeURIComponent(match[1]);
                }
            
        }

        this.tele=true;

        this._id = id;
        this._callId = callId;
        this._accountId = accountId;
        this._localContact = localContact;
        this._localUri = localUri;
        this._remoteContact = remoteContact;
        this._remoteUri = remoteUri;
        this._state = state;
        this._stateText = stateText;
        this._held = held;
        this._muted = muted;
        this._speaker = speaker;
        this._connectDuration = connectDuration;
        this._totalDuration = totalDuration;
        this._remoteOfferer = remoteOfferer;
        this._remoteAudioCount = remoteAudioCount;
        this._remoteVideoCount = remoteVideoCount;
        this._remoteNumber = remoteNumber;
        this._remoteName = remoteName;
        this._audioCount = audioCount;
        this._videoCount = videoCount;
        this._lastStatusCode = lastStatusCode;
        this._lastReason = lastReason;

        this._media = media;
        this._provisionalMedia = provisionalMedia;
        this._creationTime=creationTime;
        this._connectTime=connectTime;
        this._constructionTime = Math.round(new Date().getTime() / 1000);

        this._hashCode=hashCode;
        this._details=details;
        
        this._direction=direction;
        if (direction=="0") this._direction="DIRECTION_INCOMING";
        if (direction=="1") this._direction="DIRECTION_OUTGOING";
        if (direction=="-1") this._direction="DIRECTION_UNKNOWN";
    }
    getId() {
        return this._id;
    }

    getAccountId() {
        return this._accountId;
    }

    getCallId() {
        return this._callId;
    }

    getTotalDuration() {
        let time = Math.round(new Date().getTime() / 1000);
        let offset = time - this._constructionTime;

        return this._totalDuration + offset;
    };

    getConnectDuration() {
    
        if (this._connectDuration < 0 || this._state == "PJSIP_INV_STATE_DISCONNECTED") {
            return this._connectDuration;
        }
        let time = Math.round(new Date().getTime() / 1000);
        let offset = time - this._constructionTime;

        console.log(this._connectDuration);
        console.log(offset);
        
        return offset; //-connect duration
    }

    getFormattedTotalDuration() {
        return this._formatTime(this.getTotalDuration());
    };

    getFormattedConnectDuration() {
        return this._formatTime(this.getConnectDuration());
    };

    getLocalContact() {
        return this._localContact;
    }

    getLocalUri() {
        return this._localUri;
    }

    getRemoteContact() {
        return this._remoteContact;
    }


    getRemoteUri() {
        return this._remoteUri;
    }

    getRemoteName() {
        return this._remoteName;
    }


    getRemoteNumber() {
        return this._remoteNumber;
    }


    getRemoteFormattedNumber() {
        if (this._remoteName && this._remoteNumber) {
            return `${this._remoteName} <${this._remoteNumber}>`;
        } else if (this._remoteNumber) {
            return this._remoteNumber;
        } else {
            return this._remoteUri
        }
    }

    getState() {
        return this._state;
    }

    getStateText() {
        return this._stateText;
    }

    isHeld() {
        return this._held;
    }

    isMuted() {
        return this._muted;
    }

    isSpeaker() {
        return this._speaker;
    }

    isTerminated() {
        return this._state === 'PJSIP_INV_STATE_DISCONNECTED';
    }

    getRemoteOfferer() {
        // TODO Verify whether boolean value
        return this._remoteOfferer;
    }


    getRemoteAudioCount() {
        return this._remoteAudioCount;
    }

    getRemoteVideoCount() {
        return this._remoteVideoCount;
    }


    getAudioCount() {
        return this._audioCount;
    }

    getVideoCount() {
        return this._videoCount;
    }

    
    getLastStatusCode() {
        return this._lastStatusCode;
    }

    getLastReason() {
        return this._lastReason;
    }

    getMedia() {
        return this._media;
    }

    getProvisionalMedia() {
        return this._provisionalMedia;
    }

    _formatTime(seconds) {
        if (isNaN(seconds) || seconds < 0) {
            return "00:00";
        }
        var hours = parseInt( seconds / 3600 ) % 24;
        var minutes = parseInt( seconds / 60 ) % 60;
        var result = "";
        seconds = seconds % 60;

        if (hours > 0) {
            result += (hours < 10 ? "0" + hours : hours) + ":";
        }

        result += (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds  < 10 ? "0" + seconds : seconds);
        return result;
    };
}