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
or alternatively using `brew install fastlane`

# Available Actions
### make_badge
```
fastlane make_badge
```
Make new versioned icon badges.
### bump_badge
```
fastlane bump_badge
```
Bump and badge iOS and Android.

----

## Android
### android deploy_staging
```
fastlane android deploy_staging
```
Build, deploy staging Android.
### android deploy_production
```
fastlane android deploy_production
```
Build, deploy production Android.
### android bump_badge_deploy_staging
```
fastlane android bump_badge_deploy_staging
```
Bump, badge, deploy staging Android.
### android bump_badge_deploy_prod
```
fastlane android bump_badge_deploy_prod
```
Bump, badge, deploy production Android.

----

## iOS
### ios certificates
```
fastlane ios certificates
```
Set up certs and profiles for iOS.
### ios deploy_staging
```
fastlane ios deploy_staging
```
Sign, build, deploy staging iOS.
### ios deploy_production
```
fastlane ios deploy_production
```
Sign, build, deploy production iOS.
### ios bump_badge_deploy_staging
```
fastlane ios bump_badge_deploy_staging
```
Bump, badge, sign, build, deploy staging iOS.
### ios bump_badge_deploy_prod
```
fastlane ios bump_badge_deploy_prod
```
Bump, badge, sign, build, deploy production iOS.

----

This README.md is auto-generated and will be re-generated every time [fastlane](https://fastlane.tools) is run.
More information about fastlane can be found on [fastlane.tools](https://fastlane.tools).
The documentation of fastlane can be found on [docs.fastlane.tools](https://docs.fastlane.tools).
