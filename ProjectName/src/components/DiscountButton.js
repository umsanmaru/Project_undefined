import React from "react";
import { TouchableOpacity,  View } from 'react-native'
import { defaultFontText as Text } from './Text';
import { defaultBoldText as BoldText} from './BoldText';

const DiscountButton = ({onPress, people, discount, certificated}) => (
  <TouchableOpacity onPress={onPress} disabled={certificated ? false: true}>
    <View style = {{flexDirection: 'row', justifyContent: 'space-between', borderColor: "#4769EE",
    borderWidth: 1, borderRadius: 18, marginTop: 12, opacity: certificated ? 1.0: 0.3}}>
      <Text style = {{color: "black", fontSize: 16, marginLeft: 16, marginVertical: 16, }}>{people}인 쿠폰</Text>
      <View style ={{backgroundColor: "#4769EE", paddingVertical: 16, borderBottomRightRadius: 16,
      borderTopRightRadius: 16, width: 91, alignItems:'center'}}>
        <BoldText style={{color:"white", fontSize: 16, }}>{discount}% 할인</BoldText>
      </View>
    </View>
  </TouchableOpacity>
);

export default DiscountButton;