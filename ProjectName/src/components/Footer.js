import React from "react";
import { View, TouchableOpacity } from 'react-native';
import { defaultFontText as Text } from './Text';
import { defaultBoldText as BoldText} from './BoldText';


const Footer = ({onPress, buttonText,disable_touch}) => (
  <View style ={{
    borderColor: "#EDEDEE", 
    borderTopWidth: 1, 
    paddingHorizontal: 32, 
    paddingTop: 16,
    height: 102, 
    width: "100%", 
    zIndex: 100,

  }}>
    <TouchableOpacity onPress={onPress} disabled={disable_touch}>
      <View style={{
        backgroundColor: "#4769EE", 
        paddingVertical: 16, 
        alignItems: "center", 
        borderRadius: 16
      }}>
        <BoldText style={{color: "white", fontSize: 16, }}>{buttonText}</BoldText>
      </View>
    </TouchableOpacity>
  </View>
);

export default Footer;