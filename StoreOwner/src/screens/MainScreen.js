import React, {useState, useRef, useEffect} from 'react';
import {SafeAreaView,Text,} from 'react-native';

import {Alert,Vibration,View,} from "react-native";
import { Camera, CameraType } from "react-native-camera-kit";
import { Dimensions} from 'react-native';

const CameraFocus = ()=> (
  <View style={{ position:"absolute", borderColor: "white", 
    overflow:"hidden",borderWidth: 5, 
        height: Dimensions.get('window').width*0.66, width: "66%",
        top: (Dimensions.get('window').height-Dimensions.get('window').width*0.66)/2,
        left: Dimensions.get('window').width*0.16}}></View>
);

const MainScreen= ({navigation}) => {
  const [scaned, setScaned] = useState(true);
  const ref = useRef(null);
  useEffect(() => {
    // 종료후 재시작을 했을때 초기화
    setScaned(true);
  }, []);
  const onBarCodeRead = (event) => {
    if (!scaned) return;
    setScaned(false);
    Vibration.vibrate();
    Alert.alert("인증 완료되었습니다", event.nativeEvent.codeStringValue, [
      { text: "OK", onPress: () => setScaned(true) },
    ]);
  };
  return (
    <SafeAreaView style={{flex: 1,}}>
      <View style={{paddingVertical: 18, alignItems: "center"}}>
        <Text style={{color: "black", fontSize: 24, fontWeight: "700"}}>내자상회</Text>
      </View>
      <Camera style={{flex: 1,}}
        cameraType={CameraType.Back}
        scanBarcode={true}
        onReadCode={onBarCodeRead}
        ></Camera>
      <CameraFocus></CameraFocus>
    </SafeAreaView>
  );
};

export default MainScreen;
