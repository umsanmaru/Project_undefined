import React from 'react';
import { TouchableOpacity } from 'react-native';
import { styles } from '../screens/Style';
import { defaultFontText as Text } from './Text';

const UnsignedHeader = ({onPress}) => (
  <TouchableOpacity onPress ={onPress} style={styles.UnsignedContainer}>
    <Text style={styles.UnsignedText}>관람 인증 후 쿠폰을 자유롭게 이용하세요!</Text>
  </TouchableOpacity>
);

export default UnsignedHeader;