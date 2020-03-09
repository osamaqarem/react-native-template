# react-native-template 🌠

<div align="center">
    <img src="icon.png" alt="Logo" width="24%">
</div>
<br/>

A minimal but scalable template with common libraries and utilities.

## Preconfigured with

- TypeScript
- [Redux](https://redux.js.org/) + [Toolkit](https://redux-toolkit.js.org/)
- [Redux Observable](https://redux-observable.js.org/)
- [React Navigation](https://reactnavigation.org/) (**v5**)
- [Reactotron](https://github.com/infinitered/reactotron)
- [Sentry](https://docs.sentry.io/platforms/react-native/) with redux action logging middleware
- [react-native-splash-screen](https://github.com/crazycodeboy/react-native-splash-screen)
- [Reanimated](https://software-mansion.github.io/react-native-reanimated/)
- [AsyncStorage](https://github.com/react-native-community/async-storage)
- [NetInfo](https://github.com/react-native-community/react-native-netinfo)
- [FastImage](https://github.com/DylanVann/react-native-fast-image)
- Good practice/convenience — error boundary, architecture, services & utils...

## Getting Started

Create a new project using the template

```bash
$ npx react-native init MyApp --template @osamaq/react-native-template
```

### MacOS

Configure native iOS and Android with Sentry SDK

```bash
$ npx sentry-wizard -i reactNative -p ios android
```

Install pods

```bash
$ cd ios && pod install
$ cd ..
```

### Other Platforms

Configure only native Android with Sentry SDK

```bash
$ npx sentry-wizard -i reactNative -p android
```

## TODO

- [ ] Add [Detox](https://github.com/wix/Detox)
- [ ] Add CodePush/OTA
