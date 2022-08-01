import React, {useState, useEffect} from 'react';
import { styles } from '../screens/Style';
import { TouchableOpacity, Image, Dimensions, Text, View, Modal, KeyboardAvoidingView } from 'react-native'
import QRCode from 'react-native-qrcode-svg';

import Footer from './Footer';

const CouponModal = ({onPress, openCoupon, onPressCoupon, userToken})=> {
  const curTime = new Date().toString();
  const [couponInfo, setCouponInfo] = useState(openCoupon);
  const qrCode = !couponInfo ? <View/> : (<QRCode
    size={200}
    logoSize={100}
    value={
      `time:${curTime}_n:${couponInfo?.n}_dis:${couponInfo.discount}_token:${userToken}`}
  />);

  useEffect(()=>{
    setCouponInfo(openCoupon);
  }, [openCoupon]);

  return (
    <Modal 
      animationType='none' 
      visible={!!openCoupon} 
      transparent={true} 
      presentationStyle='overFullScreen' 
      style={{zIndex: 1,}}
    >
          <View style={styles.modal}>
            <View style={{height: "100%", width: "100%", justifyContent: "center", alignItems: "center"}}>
            <View style ={{marginHorizontal: 16, backgroundColor: "white", borderRadius: 30,}}>
              <Text style={styles.textinmodal}>내자상회</Text>
              <View style={{alignItems:"center"}}>{qrCode}</View>
              <View style={{flexDirection:'row', justifyContent: 'space-between', marginVertical: 16, marginHorizontal: 32} }>
                <Text style ={{fontSize: 15, fontWeight: '400', color: "black"}}>2명 방문시 5% 할인</Text>
                <Text style ={{fontSize: 15, fontWeight: '400', color: "#8F8F8F"}}>2022.07.19 19:18 발급</Text>
              </View>
              <View>
                <Footer buttonText={'쿠폰 변경 하기'} onPress={onPressCoupon}></Footer>
              </View>
            </View>
          </View></View>
        
    </Modal>
  );
}
 

export default CouponModal;