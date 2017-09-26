# Kano Shared Storage Client
Library script to define a class for instantiating an instance of zendesk's shared storage client.

The client is placed on the `Kano.World.SharedStorage` property.

The constructor of the `KanoSharedStorageClient` accepts an options dictionary with the following keys:
* keyMap: dictonary of keys mapping app objects to their local storage keys. Currently accepts key definitions for progress, session and token. Defaults to
```js
{
  progress:       "KW_PROGRESS",
  progressEvents: "KW_PROGESS_EVENTS",
  session:        "KW_SESSION",
  token:          "KW_TOKEN"
}
```
 * sharedStorageURL: Url to cross-storage hub instance

For example
```js
const options = {
  keyMap: {progress: "progress"},
  sharedStorageURL: Config.SHARED_STORAGE_URL
}
const SharedStorage = new Kano.KanoSharedStorageClient(options);
```
### API
```js
KanoSharedStorageClient.getToken
KanoSharedStorageClient.setToken
KanoSharedStorageClient.deleteToken
KanoSharedStorageClient.getProgress
KanoSharedStorageClient.setProgress
KanoSharedStorageClient.deleteProgress
KanoSharedStorageClient.saveProgressEvent
KanoSharedStorageClient.getProgressEvents
KanoSharedStorageClient.deleteProgressEvents
KanoSharedStorageClient.get // Expose ZENDESK::CrossStorageClient:get
KanoSharedStorageClient.set // Expose ZENDESK::CrossStorageClient:set
```
## TODO
Add tests.