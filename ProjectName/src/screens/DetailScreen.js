import React, { Component } from 'react'
import { SafeAreaView, StyleSheet, Text, ScrollView, View, TextInput, Modal, Keyboard, KeyboardAvoidingView, ActivityIndicator} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import {SliderBox} from 'react-native-image-slider-box';
import { useState, useEffect } from 'react';


const styles = StyleSheet.create({
  sliderdot:{
    width: 8,height: 8,borderRadius: 8,marginHorizontal: 0,
  },
  Name: {
    color: "#212121",
    fontWeight: 'bold',
    fontSize: 24,
  },
  Info: {
    color: '#8F8F8F',
    //backgroundColor: "pink",
    fontSize: 16,
    top: 4,
  },
  Address: {
    color: '#232323',
    fontSize: 16,
    marginTop: 24,
  },
  scrollview: {
    //backgroundColor: 'lightblue',
    height: 350, 
    paddingHorizontal: 32,
    paddingVertical: 24,
    keyboardShouldPersistTaps: 'handled',
  },
  ButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 8,
    marginBottom: 12,
  },
  textbutton: {
    color: "#4769EE",
    fontSize: 16,
    fontWeight: "600",
    marginRight: 12, 
  },
  modal:{
    height: "100%", width: "100%", backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  modalwhitepart:{
    position: "absolute", bottom: 0,
    height: "30%", width: "100%", backgroundColor: "white", 
    borderTopLeftRadius: 30, borderTopRightRadius: 30, 
  },
  textinmodal:{
    fontSize: 23,
    marginHorizontal: 32, marginBottom: 16,
    marginTop: 44,
    fontWeight: "700", 
  },
  textinputbox:{
    borderWidth: 1, paddingHorizontal:16,
    marginHorizontal: 32, marginBottom: 16,
    height: 52, borderColor: "#B1AEAE", borderRadius: 12,
  },
});

const customImg = [
  require('./images/banner-1.jpeg'),
  require('./images/banner-2.jpeg'),
  require('./images/banner-3.jpeg'),
];

const Information = ({storeName})=> (
  <View>
    <Text style={styles.Name}>{storeName}</Text>
    <Text style ={styles.Info}>카페, 디저트</Text>
    <Text style ={styles.Address}>서울 종로구 사직로10길 3 1층</Text>
  </View>
);

const TextButton = ({onPress, title}) => (
  <TouchableOpacity onPress={onPress}><Text style={styles.textbutton}>{title}</Text></TouchableOpacity>
);

const DiscountButton = ({onPress, people, discount}) => (
  <TouchableOpacity onPress={onPress}>
  <View style = {{flexDirection: 'row', justifyContent: 'space-between', borderColor: "#4769EE",
  borderWidth: 1, borderRadius: 18, marginTop: 12,}}>
    <Text style = {{fontSize: 16, fontWeight:"400", marginLeft: 16, marginVertical: 16, }}>{people}인 쿠폰</Text>
    <View style ={{backgroundColor: "#4769EE", paddingVertical: 16, borderBottomRightRadius: 16,
  borderTopRightRadius: 16, width: 91, alignItems:'center'}}>
      <Text style={{color:"white", fontSize: 16, fontWeight: "700"}}>{discount}% 할인</Text>
    </View>
  </View></TouchableOpacity>
);

const Footer = ({onPress}) => (
  <View style ={{borderColor: "#EDEDEE", borderTopWidth: 1, paddingHorizontal: 32, paddingTop: 16,
  height: 102, width: "100%", zIndex: 100}}>
  <TouchableOpacity onPress={onPress}>
    <View style={{backgroundColor: "#4769EE", paddingVertical: 16, alignItems: "center", borderRadius: 16}}>
      <Text style={{color: "white", fontSize: 16, fontWeight: "700"}}>관람 인증하기</Text>
    </View></TouchableOpacity>
  </View>
);

const Cert_Modal = ({onPress, Certificate})=>(
  <Modal
    animationType='none'
    visible={Certificate}
    transparent={true}
    presentationStyle='overFullScreen'
    style={{zIndex: 1}}
  >
  <KeyboardAvoidingView style ={{flex:1}} behavior='padding'>
    <TouchableOpacity onPress={onPress}>
      <View style={styles.modal}>
      <View style ={styles.modalwhitepart}>
        <Text style={styles.textinmodal}>티켓 코드 입력</Text>
        <TextInput eyboardType='numeric' placeholder="티켓 앞장 하단의 코드를 입력하세요" style={styles.textinputbox}></TextInput>
        <Footer></Footer>
      </View></View>
    </TouchableOpacity>
  </KeyboardAvoidingView>
  </Modal>
);

const DetailScreen = ({route}) => {

  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    setTimeout(()=>setIsLoading(false), 1000);
  }, [])

  const id = [1, 2, 3, 4, 5, 6]
  const buttonList = id.map((button)=> (
    <DiscountButton people={button} discount={5*button}/>
  ))
  const [Certificate, setCertificate] = useState(false);

  return (
    <SafeAreaView>
      <SliderBox 
        images ={customImg} 
        sliderBoxHeight={292}
        dotColor="#FFFFFF" 
        inactiveDotColor="lightgray" 
        dotStyle={styles.sliderdot}
      />
      <ScrollView style={styles.scrollview} >
        <Information storeName={route.params.storeName}/>
        {
          // Check isLoading for api call
          isLoading ? <ActivityIndicator/> :(
            <View style ={{marginBottom: 44}}>
              <View style={styles.ButtonContainer}>
              <TextButton title="카카오맵"/><TextButton title="네이버지도"/>
              </View>
              <View>{buttonList}</View>
            </View>
          )
        }
      </ScrollView>
      <Footer onPress={() => {setCertificate(true)}}/>
      <Cert_Modal Certificate={Certificate} onPress={()=> {setCertificate(false)}}/>
    </SafeAreaView>
  );
}



export default DetailScreen;
