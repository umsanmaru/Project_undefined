import React, {useState, useEffect} from 'react';
import { styles } from '../screens/Style';
import { TouchableOpacity, Image, Dimensions, View, Modal, KeyboardAvoidingView } from 'react-native'
import QRCode from 'react-native-qrcode-svg';
import { defaultFontText as Text } from './Text';
import Footer from './Footer';

const CouponModal = ({openCoupon, onPressCoupon, userToken, certTime, storeName})=> {
  const curTime = new Date();
  const year = curTime.getFullYear();
  const month = curTime.getMonth() + 1;
  const date = curTime.getDate();
  const minute = curTime.getMinutes();
  const hour = curTime.getHours();
  const [couponInfo, setCouponInfo] = useState(openCoupon);
  const qrCode = !couponInfo ? <View/> : (<QRCode
    size={200}
    logoSize={100}
    value={
      `certTime=${certTime}_time=${curTime.toString()}_n=${couponInfo?.n}_
      dis=${couponInfo?.discount}_token=${userToken}_storeName=${storeName}`
    }
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
              <Text style={styles.textinmodal}>{storeName}</Text>
              <View style={{alignItems:"center"}}>{qrCode}</View>
              <View style={{flexDirection:'row', justifyContent: 'space-between', marginVertical: 16, marginHorizontal: 32} }>
                <Text style ={{fontSize: 15, color: "black"}}>
                  {`${couponInfo?.n}명 방문시 ${couponInfo?.discount}% 할인`}
                </Text>
                <Text style ={{fontSize: 15, color: "#8F8F8F"}}>
                  {`${year}.${month>10?month:"0"+month}.${date>10?date:"0"+date} ${hour}:${minute>10?minute:"0"+minute} 발급`}
                </Text>
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