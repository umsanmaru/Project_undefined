import React, {useState, useEffect, useRef, useMemo} from 'react';
import { TouchableOpacity, Image, Dimensions, View, Modal, KeyboardAvoidingView} from 'react-native'
import QRCode from 'react-native-qrcode-svg';
import { defaultFontText as Text } from './Text';
import Footer from './Footer';
import { defaultBoldText as BoldText} from './BoldText';

const CouponModal = ({openCoupon, onPressCoupon, userToken, certTime, storeName})=> {
  const curTime = useMemo (()=> {
    return new Date();
  }, [openCoupon]);
  const year = curTime.getFullYear();
  const month = curTime.getMonth() + 1;
  const date = curTime.getDate();
  const minute = curTime.getMinutes();
  const hour = curTime.getHours();
  const [couponInfo, setCouponInfo] = useState(openCoupon);
  const qrCode = !couponInfo ? <View/> : (<QRCode
    size={Dimensions.get('window').height*0.25}
    logoSize={100}
    value={
      `certTime=${certTime}_time=${curTime.toString()}_n=${couponInfo?.n}_
      dis=${couponInfo?.discount}_token=${userToken}_storeName=${storeName}`
    }
  />);

  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    if (!timeLeft) return onPressCoupon();
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [timeLeft]);

  useEffect(()=>{
    setCouponInfo(openCoupon);
    setTimeLeft(60);
  }, [openCoupon]);

  return (
    <Modal 
      animationType='slide' 
      visible={!!openCoupon} 
      transparent={false} 
      presentationStyle='overFullScreen' 
      style={{zIndex: 1,}}
    >
    <View style={{position: "absolute", bottom: 0, width: "100%", justifyContent: "flex-end", alignItems: "center"}}>
      <TouchableOpacity style={{width: 36, height: 36, backgroundColor: "#4769EE", borderRadius: 36,
    alignItems: "center", justifyContent: "center", marginBottom: 10,}}>
        <BoldText style={{color: "white"}}>{timeLeft}</BoldText>
      </TouchableOpacity>
      <Text style ={{fontSize: 14, color: "#8F8F8F"}}>제한 시간 안에 인증을 완료하세요</Text>
      <View style={{marginBottom: Dimensions.get("window").height*0.165, 
    marginTop: Dimensions.get("window").height*0.20}}>{qrCode}</View>
        <View style={{width: "100%", alignItems:"flex-start"}}>
          <BoldText style={{fontSize: 23, color:"black", marginBottom: 12,marginLeft: 32,}}>{storeName}</BoldText>
        </View>
        <View style={{flexDirection:"row",justifyContent:"space-between", width: "100%", marginBottom: 16,} }> 
          <Text style ={{fontSize: 15, color: "black", marginBottom: 2, marginLeft: 32,}}>{`${couponInfo?.n}명 방문시 ${couponInfo?.discount}% 할인`}</Text>
          <Text style ={{fontSize: 15, color: "#8F8F8F", marginRight: 32,}}>{`${year}.${month>10?month:"0"+month}.${date>10?date:"0"+date} ${hour}:${minute>10?minute:"0"+minute} 발급`}</Text>
        </View>
        <Footer buttonText={'QR 코드 닫기'} onPress={onPressCoupon}></Footer>
      </View>  
    </Modal>
  );
}
 

export default CouponModal;