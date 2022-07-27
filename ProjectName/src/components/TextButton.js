import React from "react";
import { styles } from "../screens/Style";
import { TouchableOpacity, Text } from 'react-native';

const TextButton = ({onPress, title}) => (
  <TouchableOpacity onPress={onPress}>
    <Text style={styles.textbutton}>{title}</Text>
  </TouchableOpacity>
);

export default TextButton;