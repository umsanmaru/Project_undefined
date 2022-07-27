import React from 'react';
import { styles } from '../screens/Style';
import { TouchableOpacity, Image, Dimensions, Text, View, Modal, KeyboardAvoidingView } from 'react-native'

import Footer from './Footer';

const CouponModal = ({onPress, openCoupon, onPressCoupon})=>(
  <Modal 
    animationType='none' 
    visible={openCoupon} 
    transparent={true} 
    presentationStyle='overFullScreen' 
    style={{zIndex: 1,}}
  >
    <KeyboardAvoidingView 
      behavior="position" 
      style={{height: Platform.OS === 'android' ? Dimensions.get('window').height: '100%'}}
    >
      <TouchableOpacity onPress={onPress}>
        <View style={styles.modal}>
          <View style ={styles.couponmodalwhitepart}>
            <Text style={styles.textinmodal}>내자상회</Text>
            <Image source={require('../screens/images/barcode.png')} style={{marginLeft: 32, width: Dimensions.get('window').width-64, height: 64}}></Image>
            <View style={{flexDirection:'row', justifyContent: 'space-between', marginVertical: 16, marginHorizontal: 32} }>
              <Text style ={{fontSize: 15, fontWeight: '400', color: "black"}}>2명 방문시 5% 할인</Text>
              <Text style ={{fontSize: 15, fontWeight: '400', color: "#8F8F8F"}}>2022.07.19 19:18 발급</Text>
            </View>
            <Footer buttonText={'쿠폰 변경 하기'} onPress={onPressCoupon}></Footer>
          </View>
        </View>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  </Modal>
);

export default CouponModal;