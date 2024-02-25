# Open Kitchen API

Now using firebase functions!

To start the app - please run
```npm start```

This starts the firebase emulators suite. You can visit this suite at `http://127.0.0.1:4000/` (or `localhost:4000/`).

The firebase emulators suite will emulate firebase functions on port `5001`. Please note that the firebase functions emulator will fail on the first, potential several, requests. Please refer to the following error guide

- `404` / Failed - Your server is either not running or is breaking!
- `500 Cannot read properties of undefined (reading 'get_categories')` - Firebase Emulators are taking their time starting up. Keep hard-reloading until the errors go away.
