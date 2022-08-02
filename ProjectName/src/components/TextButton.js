import React from "react";
import { styles } from "../screens/Style";
import { TouchableOpacity } from 'react-native';
import { defaultFontText as Text } from './Text';
import { defaultBoldText as BoldText} from './BoldText';


const TextButton = ({onPress, title}) => (
  <TouchableOpacity onPress={onPress}>
    <BoldText style={styles.textbutton}>{title}</BoldText>
  </TouchableOpacity>
);

export default TextButton;