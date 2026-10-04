/**
 * @format
 */

import 'react-native-gesture-handler';
import { AppRegistry, Text, TextInput } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { fontFamilies } from './src/theme/theme';

if (Text.defaultProps == null) {
  Text.defaultProps = {};
}
Text.defaultProps.style = { fontFamily: fontFamilies.regular };

if (TextInput.defaultProps == null) {
  TextInput.defaultProps = {};
}
TextInput.defaultProps.style = { fontFamily: fontFamilies.regular };

AppRegistry.registerComponent(appName, () => App);
