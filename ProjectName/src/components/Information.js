import React from "react";
import { Text, View } from 'react-native';
import { openURL } from "../screens/openUrl";

import TextButton from "./TextButton";

const Information = ({storeName, storeCategory, storeAddress, kakaoUrl, naverUrl})=> (
  <>
    <View>
      <Text style={{color: "#212121", fontWeight: 'bold', fontSize: 24,}}>{storeName}</Text>
      <Text style ={{color: '#8F8F8F', fontSize: 16, top: 4,}}>{storeCategory}</Text>
      <Text style ={{color: '#232323', fontSize: 16, marginTop: 24,}}>{storeAddress}</Text>
    </View>
    <View style={{flexDirection:'row', marginTop: 4, marginBottom: 20,}}>
      <TextButton title="카카오맵"/>
      <TextButton title="네이버지도"/>
    </View>
  </>
);

export default Information;