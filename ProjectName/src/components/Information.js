import React from "react";
import { View } from 'react-native';
import { openURL } from "../openUrl";
import { defaultFontText as Text } from './Text';
import TextButton from "./TextButton";
import { defaultBoldText as BoldText} from './BoldText';


const Information = ({storeName, storeCategory, storeAddress, kakaoUrl, naverUrl})=> (
  <>
    <View>
      <BoldText style={{color: "#212121",  fontSize: 24,}}>{storeName}</BoldText>
      <Text style ={{color: '#8F8F8F', fontSize: 16, top: 4,}}>{storeCategory}</Text>
      <Text style ={{color: '#232323', fontSize: 16, marginTop: 24,}}>{storeAddress}</Text>
    </View>
    <View style={{flexDirection:'row', marginTop: 4, marginBottom: 20,}}>
      <TextButton title="카카오맵" onPress={()=>openURL(kakaoUrl)}/>
      <TextButton title="네이버지도" onPress={()=>openURL(naverUrl)}/>
    </View>
  </>
);

export default Information;