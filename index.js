/**
 * @format
 */

import { AppRegistry, Platform, Text, TextInput } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

const regular = Platform.OS === 'android' ? 'Inter_400Regular' : 'Inter-Regular';

if (Text.defaultProps == null) {
  Text.defaultProps = {};
}
Text.defaultProps.style = { fontFamily: regular };

if (TextInput.defaultProps == null) {
  TextInput.defaultProps = {};
}
TextInput.defaultProps.style = { fontFamily: regular };

AppRegistry.registerComponent(appName, () => App);
