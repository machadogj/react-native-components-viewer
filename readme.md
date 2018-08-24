# react-native-components-viewer

Use an iPad to test your components layout in different screen sizes. It uses
the [react-native-layout-tester](https://github.com/machadogj/react-native-layout-tester).

![component-viewer-sample](https://cloud.githubusercontent.com/assets/671212/16655335/358d622e-4430-11e6-84df-6193f7da748f.gif)

## Installation

```
npm install --save react-native-components-viewer
```

## Usage

Define your specs:

```
// specs.js
import LogIn from '../screens/login';
import SignUp from '../screens/signup';
import WalkThrough from '../screens/walkthrough';
import Home from '../screens/home';

export default [{
  type: LogIn,
  props: [{
    name: 'empty',
    username: null,
    password: null
  }, {
    name: 'complete',
    username: 'john_doe',
    password: 'long_password'
  }, {
    name: 'errors',
    username: 'john_doe',
    username_error: 'invalid username',
    password: 'long_password',
    password_error: 'invalid password'
  }]
}, {
  type: Home,
  props: null
}, {
  type: SignUp,
  props: null
}, {
  type: WalkThrough
}];
```

Then pass your specs to the ComponentsViewer:

```
import React, { Component } from 'react';
import { AppRegistry } from 'react-native';

import ComponentsViewer from 'react-native-components-viewer';
import LayoutTests from './layout_tests/specs';

class LayoutTest extends Component {
  render() {
    return (
      <ComponentsViewer specs={ LayoutTests } />
    );
  }
}

AppRegistry.registerComponent('LayoutTest', () => LayoutTest);

```

This works particularly well with `Presentational Components` as in [redux
architecture](http://redux.js.org/docs/basics/UsageWithReact.html).

### Wrapping your entire app

In order to test your entire app, you can use the `react-native-layout-tester`
directly.

### Running your app in the iPad simulator

Then run you application in the iPad Air simulator (it has enough width to
accomodate an iPhone 6+ logical resolution in landscape mode). In order to
accomplish this, you will have to set up your xcode solution to "Universal".

![xcode universal](https://raw.githubusercontent.com/machadogj/react-native-layout-tester/master/xcode-universal.png)

NOTICE: You won't need this package in your production bundle, so you can
exclude this package by simply not importing it in any file.

## Reacting to changes in viewport

You can make your styles re-calculate on viewport changes. In order to do this,
you can use a decorator shipped in `react-native-layout-tester`.
The decorator will take changes in viewport and pass it through props to your wrapped components.
More about this [here](https://github.com/machadogj/react-native-layout-tester#reacting-to-changes-in-viewport).

## Properties

| Prop  | Default  | Type | Description |
| :------------ |:---------------:| :---------------:| :-----|
| layoutTesterConfig | `undefined` | object | Config for `react-native-layout-tester` as in [here](https://github.com/machadogj/react-native-layout-tester#properties). |
| specs | `undefined` | `array` | List of specs for testing components. |
| specs[].type | `undefined` | func | function or class of the component to test |
| specs[].props | `undefined` | array | List of different props combinations |
| specs[].props[] | `undefined` | object | This is the props object that will be passed to the component |
| specs[].props[].name | `undefined` | string | name of the test scenario |
