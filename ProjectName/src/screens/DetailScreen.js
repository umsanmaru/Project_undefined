import React from 'react'
import { SafeAreaView, Dimensions, Text, ScrollView, View, TextInput, Modal, KeyboardAvoidingView} from 'react-native'
import { TouchableOpacity, Image } from 'react-native';
import {SliderBox} from 'react-native-image-slider-box';
import { useState } from 'react';
import openUrl from './openUrl.js';
import { styles } from './Style';

const customImg = [
  require('./images/banner-1.jpeg'),
  require('./images/banner-2.jpeg'),
  require('./images/banner-3.jpeg'),
];

const Information = ({storeName})=> (
  <View>
    <Text style={{color: "#212121", fontWeight: 'bold', fontSize: 24,}}>내자상회</Text>
    <Text style ={{color: '#8F8F8F', fontSize: 16, top: 4,}}>카페, 디저트</Text>
    <Text style ={{color: '#232323', fontSize: 16, marginTop: 24,}}>서울 종로구 사직로10길 3 1층</Text>
  </View>
);

const TextButton = ({onPress, title}) => (
  <TouchableOpacity onPress={onPress}>
    <Text style={styles.textbutton}>{title}</Text>
  </TouchableOpacity>
);

const DiscountButton = ({onPress, people, discount}) => (
  <TouchableOpacity onPress={onPress}>
    <View style = {{flexDirection: 'row', justifyContent: 'space-between', borderColor: "#4769EE",
    borderWidth: 1, borderRadius: 18, marginTop: 12,}}>
      <Text style = {{color: "black", fontSize: 16, fontWeight:"400", marginLeft: 16, marginVertical: 16, }}>{people}인 쿠폰</Text>
      <View style ={{backgroundColor: "#4769EE", paddingVertical: 16, borderBottomRightRadius: 16,
      borderTopRightRadius: 16, width: 91, alignItems:'center'}}>
        <Text style={{color:"white", fontSize: 16, fontWeight: "700"}}>{discount}% 할인</Text>
      </View>
    </View>
  </TouchableOpacity>
);

const Footer = ({onPress, Textin}) => (
  <View style ={{borderColor: "#EDEDEE", borderTopWidth: 1, paddingHorizontal: 32, paddingTop: 16, width: "100%", zIndex: 100}}>
    <TouchableOpacity onPress={onPress}>
      <View style={{backgroundColor: "#4769EE", paddingVertical: 16, alignItems: "center", borderRadius: 16}}>
        <Text style={{color: "white", fontSize: 16, fontWeight: "700"}}>{Textin}</Text>
      </View>
    </TouchableOpacity>
  </View>
);

const Cert_Modal = ({onPress, Certificate})=>(
  <Modal
    animationType='none'
    visible={Certificate}
    transparent={true}
    presentationStyle='overFullScreen'
    style={{zIndex: 1,}}
  >
    <KeyboardAvoidingView 
      behavior="position"
      style={{height: Platform.OS === 'android' ? Dimensions.get('window').height: '100%',}}
    >
      <TouchableOpacity onPress={onPress}>
        <View style={styles.modal}>
          <View style ={styles.modalwhitepart}>
            <Text style={styles.textinmodal}>티켓 코드 입력</Text>
            <TextInput eyboardType='numeric' placeholder="티켓 앞장 하단의 코드를 입력하세요" placeholderTextColor="#B1AEAE" style={styles.textinputbox}></TextInput>
            <Footer Textin={'티켓 코드 입력'}></Footer>
          </View>
        </View>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  </Modal>
);

const Coupon_Modal = ({onPress, OpenCoupon})=>(
  <Modal 
    animationType='none' 
    visible={OpenCoupon} 
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
            <Image source={require('./images/barcode.png')} style={{marginLeft: 32, width: Dimensions.get('window').width-64, height: 64}}></Image>
            <View style={{flexDirection:'row', justifyContent: 'space-between', marginVertical: 16, marginHorizontal: 32} }>
              <Text style ={{fontSize: 15, fontWeight: '400', color: "black"}}>2명 방문시 5% 할인</Text>
              <Text style ={{fontSize: 15, fontWeight: '400', color: "#8F8F8F"}}>2022.07.19 19:18 발급</Text>
            </View>
            <Footer Textin={'쿠폰 변경 하기'}></Footer>
          </View>
        </View>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  </Modal>
);

const DetailScreen = ({}) => {
    const id = [1, 2, 3, 4, 5]
    const naver_url = "https://naver.me/Fn2i2g0w"
    const kakao_url = "https://place.map.kakao.com/212413668"
    const buttonList = id.map((button)=> (
      <DiscountButton people={button} discount={5*button} onPress={()=>setOpenCoupon(true)}/> 
    ))
    const [Certificate, setCertificate] = useState(false); // 티켓 인증 여부
    const [OpenCert, setOpenCert] = useState(false); // 티켓 인증 모달의 상태
    const [OpenCoupon, setOpenCoupon] = useState(false); //쿠폰 버튼의 클릭 여부

    return (
      <SafeAreaView>
        <SliderBox 
          images ={customImg} 
          sliderBoxHeight={292}
          dotColor="#FFFFFF" 
          inactiveDotColor="lightgray" 
          dotStyle={styles.sliderdot}
        />
        <ScrollView 
          style={{
            height: 
              Certificate ? 
                Dimensions.get("window").height*(444/844) : Dimensions.get("window").height*(349/844)
          }} 
        >
          <View style={styles.scrollview}>
            <Information/>
            <View style={{flexDirection:'row', marginTop: 4, marginBottom: 20,}}>
              <TextButton title="카카오맵" onPress={()=>openUrl(kakao_url)}/>
              <TextButton title="네이버지도" onPress={()=>openUrl(naver_url)}/>
            </View>
            <View>{buttonList}</View>
          </View>
        </ScrollView>
        {Certificate ? <View/> : <Footer onPress={() => {setOpenCert(true)}} Textin={"관람 인증하기"}/>}
        <Cert_Modal Certificate={OpenCert} onPress={()=> {setOpenCert(false)}}/>
        <Coupon_Modal OpenCoupon={OpenCoupon} onPress={()=> {setOpenCoupon(false)}}/>
      </SafeAreaView>
    );
}



export default DetailScreen;
