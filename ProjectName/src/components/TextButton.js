import React from "react";
import { styles } from "../screens/Style";
import { TouchableOpacity } from 'react-native';
import { defaultFontText as Text } from './Text';

const TextButton = ({onPress, title}) => (
  <TouchableOpacity onPress={onPress}>
    <Text style={styles.textbutton}>{title}</Text>
  </TouchableOpacity>
);

export default TextButton;