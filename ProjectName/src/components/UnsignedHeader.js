import React from 'react';
import { TouchableOpacity } from 'react-native';
import { styles } from '../screens/Style';
import { defaultFontText as Text } from './Text';
import { defaultBoldText as BoldText} from './BoldText';

const UnsignedHeader = ({onPress}) => (
  <TouchableOpacity onPress ={onPress} style={styles.UnsignedContainer}>
    <BoldText style={styles.UnsignedText}>관람 인증 후 쿠폰을 자유롭게 이용하세요!</BoldText>
  </TouchableOpacity>
);

export default UnsignedHeader;