import { Linking } from 'react-native';

export const openURL = (url) => {
  Linking.openURL(url);
};