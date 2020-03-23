# react-native-template 🌠

[![Build Status](https://travis-ci.com/osamaq/react-native-template.svg?branch=master)](https://travis-ci.com/osamaq/react-native-template)
[![npm dt](https://img.shields.io/npm/dt/@osamaq/react-native-template.svg)](https://www.npmjs.com/package/@osamaq/react-native-template)

<div align="center">
    <img src="docs/assets/icon.png" alt="Logo" width="24%">
</div>
<br/>

A minimal template with good architecture and common packages to let you focus on writing features right away.

## Preconfigured with

- TypeScript
- [Redux](https://redux.js.org/) with [Redux Toolkit](https://redux-toolkit.js.org/)
- [Redux Observable](https://redux-observable.js.org/)
- [React Navigation](https://reactnavigation.org/) (**v5**)
- [Reactotron](https://github.com/infinitered/reactotron)
- [Sentry](https://docs.sentry.io/platforms/react-native/) with redux action logging middleware
- [react-native-splash-screen](https://github.com/crazycodeboy/react-native-splash-screen)
- [react-native-svg](https://github.com/react-native-community/react-native-svg)
- [Reanimated](https://software-mansion.github.io/react-native-reanimated/)
- [Redash](https://wcandillon.github.io/react-native-redash/)
- [AsyncStorage](https://github.com/react-native-community/async-storage)
- [NetInfo](https://github.com/react-native-community/react-native-netinfo)
- [FastImage](https://github.com/DylanVann/react-native-fast-image)
- [Detox](https://github.com/wix/Detox)
- [Fastlane](http://fastlane.tools/)
- Other — [error boundary](https://reactjs.org/docs/error-boundaries.html), architecture, services & utils.
- Automation: npm/fastlane scripts for testing, importing fonts and images, handling versioning across iOS and Android and more.

## Getting Started

Create a new project using the template.

- **Note:** the command will fail if you have the global legacy react-native-cli installed. Make sure you uninstall it first. More info at [react-native-community/cli](https://github.com/react-native-community/cli#about).

```bash
$ npx react-native init MyApp --template @osamaq/react-native-template
```

That's it. You're ready to go.

### Optional Steps

#### Configure Sentry

This template comes with Sentry preinstalled and configured for use with a [custom middleware](https://github.com/osamaq/react-native-template/blob/master/template/src/redux/middleware/sentryMiddleware.ts) for Redux. What this middleware does is log your redux actions as breadcrumbs to Sentry's crash logs for easier debugging. It does not log the dispatched data by default, which you might wish do if your app's networking activity is lightweight.

If you do not wish to use it, simply uninstall the `@sentry/react-native` package.

<div align="center">
    <img src="docs/assets/breadcrumbs.png" alt="Logo" width="100%">
</div>

To configrure Sentry SDK and connect your account:

```bash
$ cd MyApp/

# For MacOS
$ npx sentry-wizard -i reactNative -p ios android

# Other Platforms
$ npx sentry-wizard -i reactNative -p android
```

Insert your DSN in [App.tsx](<(https://github.com/osamaq/react-native-template/blob/0c1d30722b8364013f712b18fd6abc6fed30edfa/template/App.tsx#L23)>) and you're all done.

## TODO

- [ ] Add CodePush/OTA
- [ ] i18n
- [ ] Unit Testing Examples
