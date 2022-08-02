import React, {useState, useEffect} from 'react';
import { styles } from '../screens/Style';
import { TouchableOpacity, Image, Dimensions, View, Modal, KeyboardAvoidingView } from 'react-native'
import QRCode from 'react-native-qrcode-svg';
import { defaultFontText as Text } from './Text';
import Footer from './Footer';
import { defaultBoldText as BoldText} from './BoldText';

const CouponModal = ({onPress, openCoupon, onPressCoupon, userToken})=> {
  const curTime = new Date().toString();
  const [couponInfo, setCouponInfo] = useState(openCoupon);
  const qrCode = !couponInfo ? <View/> : (<QRCode
    size={Dimensions.get('window').width*0.6}
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
          <TouchableOpacity onPress={onPress}>
          <View style={{height: "100%", width: "100%", backgroundColor: "rgba(0, 0, 0, 0.4)", }}></View>
          </TouchableOpacity>
            <View style={{position: "absolute", bottom: 0, width: "100%", justifyContent: "flex-end", alignItems: "center"}}>
            <View style ={{width:"100%", backgroundColor: "white", borderTopRightRadius: 30, borderTopLeftRadius: 30,}}>
              
              <View style={{alignItems: "center"}}>

              <BoldText style={{fontSize: 23, color:"black", marginBottom: 16,marginTop: 44,}}>내자상회</BoldText></View>
              <View style={{alignItems:"center", marginTop: 16,}}>{qrCode}</View>

              <View style={{alignItems:"center"}}>
                <View style={{flexDirection:"row",justifyContent:"space-between", marginTop: 32, width: Dimensions.get('window').width*0.8, marginBottom: 16,} }> 
                  <Text style ={{fontSize: 15, color: "black", marginBottom: 2, }}>2명 방문시 5% 할인</Text>
                  <Text style ={{fontSize: 15, color: "#8F8F8F"}}>2022.07.19 19:18 발급</Text>
                </View>
              </View>

              <View>
                <Footer buttonText={'쿠폰 변경 하기'} onPress={onPressCoupon}></Footer>
              </View>
              
            </View>
          </View>
        
    </Modal>
  );
}
 

export default CouponModal;