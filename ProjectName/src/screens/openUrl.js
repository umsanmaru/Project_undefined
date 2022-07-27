import { Linking } from 'react-native';

const openURL = (url) => {
  Linking.openURL(url);
};

export default openURL;