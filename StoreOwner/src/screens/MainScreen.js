import React, {useState, useRef, useEffect} from 'react';
import {Button, Platform, SafeAreaView,Text,Image,TouchableOpacity, Modal, KeyboardAvoidingView, TextInput} from 'react-native';

import {Alert,Dimensions,StyleSheet,Vibration,View,} from "react-native";
import { Camera, CameraType } from "react-native-camera-kit";


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
    Alert.alert("QR Code", event.nativeEvent.codeStringValue, [
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
        showFrame={true}
        onReadCode={onBarCodeRead}
        laserColor="rgba(0, 0, 0, 0)"
        frameColor="rgba(0, 0, 0, 0)"
        surfaceColor="rgba(0, 0, 0, 0)"
        ></Camera>
    </SafeAreaView>
  );
};

export default MainScreen;
