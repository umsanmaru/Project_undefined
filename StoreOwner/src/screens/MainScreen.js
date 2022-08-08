import React, {useState, useContext, useEffect} from 'react';
import {SafeAreaView,Text,} from 'react-native';

import {Alert,Vibration,View,} from "react-native";
import { Camera, CameraType } from "react-native-camera-kit";
import { Dimensions} from 'react-native';
import database from '@react-native-firebase/database';

import { AuthContext } from '../App';

const CameraFocus = ()=> (
  <View style={{ position:"absolute", borderColor: "white", 
    overflow:"hidden",borderWidth: 5, 
        height: Dimensions.get('window').width*0.66, width: "66%",
        top: (Dimensions.get('window').height-Dimensions.get('window').width*0.66)/2,
        left: Dimensions.get('window').width*0.16}}></View>
);

const isValidCoupon = (certTime, couponStoreName, storeName) => {
  console.log(couponStoreName, storeName)
  console.log(new Date(), new Date (certTime))
  if (86400*1000 > new Date() - new Date (certTime) && storeName == couponStoreName)
    return true;
  return false;
}



const MainScreen= ({navigation}) => {
  const { storeName } = useContext(AuthContext);
  const [scaned, setScaned] = useState(true);
  useEffect(() => {
    // 종료후 재시작을 했을때 초기화
    setScaned(true);
  }, []);
  const onBarCodeRead = (event) => {
    if (!scaned) return;
    setScaned(false);
    Vibration.vibrate();
    const data = event.nativeEvent.codeStringValue;
    const [certTime, time, n, discount, userToken, couponStoreName] 
      = data.split('_').map(e=>e.split('=')[1]);

    if (isValidCoupon(certTime, couponStoreName, storeName)){
      database()
        .ref(`/coupons/${userToken}/${storeName}/${time}/`)
        .set({
          certTime: certTime,
          n: n,
          discount: discount
        })
      Alert.alert("인증 완료되었습니다", `${storeName}쿠폰 ${n}명 ${discount}%`, [
        { text: "OK", onPress: () => setScaned(true) },
      ]);
    } else {
      Alert.alert("인증에 실패했습니다.", "유효한 쿠폰이 아닙니다.", [
        { text: "OK", onPress: () => setScaned(true) },
      ]);
    }
    
  };
  return (
    <SafeAreaView style={{flex: 1,}}>
      <View style={{paddingVertical: 18, alignItems: "center"}}>
        <Text style={{color: "black", fontSize: 24, fontWeight: "700"}}>꼬메노</Text>
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
