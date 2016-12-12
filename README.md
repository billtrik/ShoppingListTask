# Shopping List Task
Shopping list app written in React Native using Redux.

### Prerequisites
[Node.js](https://nodejs.org/)
[watchman](https://facebook.github.io/watchman/)
[react-native-cli](https://www.npmjs.com/package/react-native-cli)

```sh
$ brew install node
$ brew install watchman
```
Then:
```sh
$ npm install -g react-native-cli
```

### Running
##### iOS
From the project directory install the dependencies and run the app:
```sh
$ npm install
$ react-native run-ios
```
Node should spawn another tab/window in your terminal for serving files and a simulator widow should open up as well.
##### Android
You need to have either an android emulator running or device connected and adb set up.
If you can see your device when running '$ adb devices', the app should run on the same device as well.

If you don't have ANDROID_HOME set, use the '$PROJECT_DIR/android/local.properties' file to provide you android sdk path.

Once you've done that, run these in the terminal.
```sh
$ npm install
$ react-native run-android
```
Or build an .apk, by running:
```sh
$ cd android
$ gradlew ./assembleRelease
```