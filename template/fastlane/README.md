fastlane documentation
================
# Installation

Make sure you have the latest version of the Xcode command line tools installed:

```
xcode-select --install
```

Install _fastlane_ using
```
[sudo] gem install fastlane -NV
```
or alternatively using `brew cask install fastlane`

# Available Actions
### build
```
fastlane build
```
Fetch certificates. Build the iOS application.
### inc_ver
```
fastlane inc_ver
```
Increment build and version.
### make_badge
```
fastlane make_badge
```
Overwrite the current icon set with a badged version.

----

## Android
### android build
```
fastlane android build
```
Build the release APK.
### android upload
```
fastlane android upload
```
Upload the release APK to App Center.
### android beta
```
fastlane android beta
```
Build the release APK, then upload to App Center.
### android inc_ver
```
fastlane android inc_ver
```
Increment versionCode and versionName.
### android make_badge
```
fastlane android make_badge
```
Overwrite the current icon set with a badged version.

----

## iOS
### ios upload
```
fastlane ios upload
```
Upload the release IPA to App Center.
### ios certificates
```
fastlane ios certificates
```
Fetch certificates and provisioning profiles

----

This README.md is auto-generated and will be re-generated every time [fastlane](https://fastlane.tools) is run.
More information about fastlane can be found on [fastlane.tools](https://fastlane.tools).
The documentation of fastlane can be found on [docs.fastlane.tools](https://docs.fastlane.tools).
