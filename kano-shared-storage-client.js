import CrossStorageClient from './vendor/cross-storage-client.js';

const keys = {
    progress:               "KW_PROGRESS",
    progressEvents:         "KW_PROGRESS_EVENTS",
    session:                "KW_SESSION",
    token:                  "KW_TOKEN",
    localGamificationState: "KW_LOCAL_GAMIFICATION_STATE"
};
let keyMap, sharedStorage;
/*
    * opts = {
    *  keyMap: dictonary of keys mapping app objects to their local storage keys.
    *      Currently accepts key definitions for progress, session and token.
    *  sharedStorageURL: Url to cross-storage hub instance
    * }
    */
class KanoSharedStorageClient{
    constructor(options){
        const opts = options || {};
        if (opts.sharedStorageURL){
            sharedStorage = new CrossStorageClient(opts.sharedStorageURL);
        } else {
            throw new Error("Failed to initialize KanoSharedStorageClient: No hub location given");
        }
        keyMap = Object.assign({}, keys, opts.keyMap || {});
    }

    get _client(){
        return sharedStorage;
    }

    getProgress(){
        return sharedStorage.onConnect().then(function () {
            return sharedStorage.get(keyMap.progress);
        }.bind(this)).then(function(res){
            return JSON.parse(res);
        });
    }
    setProgress(progress){
        let progressString;
        try {
            progressString = JSON.stringify(progress);
        } catch (error) {
            progressString = progress;
        }
        return sharedStorage.onConnect().then(function () {
            return sharedStorage.set(keyMap.progress, progressString);
        }.bind(this));
    }
    deleteProgress(){
        return sharedStorage.onConnect().then(function () {
            return sharedStorage.del(keyMap.progress);
        }.bind(this));
    }
    saveProgressEvent(progressEvent){
        return sharedStorage.onConnect().then(function () {
            return sharedStorage.get(keyMap.progressEvents)
        })
        .then(function(progressEventListJson){
            return JSON.parse(progressEventListJson);
        })
        .then(function(progressEventList) {
            progressEventList = progressEventList || [];
            if (progressEvent.forEach){
                progressEventList = progressEventList.concat(progressEvent);
            } else {
                progressEventList.push(progressEvent);
            }
            return sharedStorage.set(keyMap.progressEvents, JSON.stringify(progressEventList));
        }.bind(this));
    }
    getProgressEvents(){
        return sharedStorage.onConnect().then(function(){
            return sharedStorage.get(keyMap.progressEvents);
        });
    }
    deleteProgressEvents(){
        return sharedStorage.onConnect().then(function () {
            return sharedStorage.del(keyMap.progressEvents);
        }.bind(this));
    }

    getToken(){
        return sharedStorage.onConnect().then(function () {
            return sharedStorage.get(keyMap.token);
        }.bind(this));
    }
    setToken(token){
        return sharedStorage.onConnect().then(function () {
            return sharedStorage.set(keyMap.token, token);
        }.bind(this));
    }
    deleteToken(){
        return sharedStorage.onConnect().then(function () {
            return sharedStorage.del(keyMap.token).then(() => {
                //TODO: Remove this when we retire the old world app
                return sharedStorage.del("KW_TOKENv2");
            });
        }.bind(this));
    }

    getLocalGamificationState() {
        return sharedStorage.onConnect().then(function () {
            return sharedStorage.get(keyMap.localGamificationState);
        }).then(function (res) {
            return JSON.parse(res);
        });
    }
    setLocalGamificationState(localGamificationState) {
        let stateString;

        try {
            stateString = JSON.stringify(localGamificationState);
        } catch (error) {
            stateString = localGamificationState;
        }

        return sharedStorage.onConnect().then(function () {
            return sharedStorage.set(keyMap.localGamificationState, stateString);
        }.bind(this));
    }
    deleteLocalGamificationState() {
        return sharedStorage.onConnect().then(function () {
            return sharedStorage.del(keyMap.localGamificationState);
        }.bind(this));
    }

    set(...args){
        return sharedStorage.onConnect().then(function () {
            return sharedStorage.set(...args);
        }.bind(this));
    }
    get(...args){
        return sharedStorage.onConnect().then(function () {
            return sharedStorage.get(...args);
        }.bind(this));
    }
    del(...args){
        return sharedStorage.onConnect().then(function () {
            return sharedStorage.del(...args);
        }.bind(this));
    }
}

export default KanoSharedStorageClient;
