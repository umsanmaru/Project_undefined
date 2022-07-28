import React, { useEffect, useState, useLayoutEffect } from 'react'
import { SafeAreaView, Dimensions, ScrollView, View, ActivityIndicator } from 'react-native'
import Icon from 'react-native-vector-icons/Feather';
import { SliderBox } from 'react-native-image-slider-box';
import { styles } from './Style';
import database from '@react-native-firebase/database';
import { certificateTicket } from '../ticketCertificate.js';

import Footer from '../components/Footer.js';
import CertModal from '../components/CertModal.js';
import Information from '../components/Information.js';
import CouponModal from '../components/CouponModal.js';
import DiscountButton from '../components/DiscountButton.js';

const customImg = [
  require('./images/banner-1.jpeg'),
  require('./images/banner-2.jpeg'),
  require('./images/banner-3.jpeg'),
];

const DetailScreen = ({navigation, route}) => {

  const {certificated, userToken, currentExhibit, storeName} = route.params;

  const [certificated_, setCertificated_] = useState(certificated); // 티켓 인증 여부
  const [openCert, setOpenCert] = useState(false); // 티켓 인증 모달의 상태
  const [openCoupon, setOpenCoupon] = useState(false); //쿠폰 버튼의 클릭 여부
  const [storeInfo, setStoreInfo] = useState({});

  const [isLoadingStoreInfo, setIsLoadingStoreInfo] = useState(true);

  const {
    storeCategory,
    storeAddress,
    naverUrl,
    kakaoUrl,
    couponList
  } = storeInfo;

  const buttonList = couponList?.map((coupon, index)=> (
    <DiscountButton
      key={index} 
      people={coupon.n} 
      discount={coupon.discount} 
      onPress={()=>{
        if (certificated_)
          setOpenCoupon(true)
      }}
    /> 
  ))

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: ()=>
        <Icon 
          name={'arrow-left'} 
          color={"black"} 
          onPress={ () => { navigation.pop() }} 
          style={{ marginLeft: 24 }} size={24}
        />,
    });
  }, [navigation]);

  useEffect(() => {
    database()
      .ref(`/users/${userToken}/certificate/${currentExhibit.replace('/', '_')}`)
      .on('value', snapshot => {
        if (snapshot.val())
          setCertificated_(snapshot.val());
      })
  }, []);

  useEffect(() => {
    database()
      .ref(`/stores/${storeName}`)
      .once('value')
      .then(snapshot => {
        if (snapshot.val())
          setStoreInfo(snapshot.val());
        setIsLoadingStoreInfo(false);
      });
  }, []);

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
            certificated_ ? 
              Dimensions.get("window").height*(444/844) : Dimensions.get("window").height*(349/844)
        }} 
      >
        <View style={styles.scrollview}>
          {isLoadingStoreInfo ? <ActivityIndicator/> : 
            (
              <>
                <Information 
                  storeName={storeName}
                  storeCategory={storeCategory}
                  storeAddress={storeAddress}
                  kakaoUrl={kakaoUrl}
                  naverUrl={naverUrl}
                />
                <View>{buttonList}</View>
              </>
            )}
        </View>
      </ScrollView>
      {certificated_ ? <View/> : <Footer onPress={() => {setOpenCert(true)}} buttonText={"관람 인증하기"}/>}
      <CertModal 
        openCert={openCert} 
        setOpenCert={setOpenCert}
        onPress={()=> {setOpenCert(false)}} 
        onPressCert={certificateTicket}
        userToken={userToken}
        currentExhibit={currentExhibit.replace('/', '_')}
        buttonText={"티켓 코드 입력"}
      />
      <CouponModal 
        openCoupon={openCoupon} 
        onPress={()=> {setOpenCoupon(false)}}
        onPressCoupon={() => {setOpenCoupon(false)}}
      />
    </SafeAreaView>
  );
}

export default DetailScreen;
