import React, { useEffect, useState, useLayoutEffect } from 'react'
import { SafeAreaView, Dimensions, ScrollView, View, ActivityIndicator } from 'react-native'
import Icon from 'react-native-vector-icons/Feather';
import { SliderBox } from 'react-native-image-slider-box';
import { styles } from './Style';
import database from '@react-native-firebase/database';
import { certificateTicket } from '../ticketCertificate.js';
import storage from '@react-native-firebase/storage';

import Footer from '../components/Footer.js';
import CertModal from '../components/CertModal.js';
import Information from '../components/Information.js';
import CouponModal from '../components/CouponModal.js';
import DiscountButton from '../components/DiscountButton.js';

const DetailScreen = ({navigation, route}) => {

  const {userToken, currentExhibit, storeName} = route.params;

  const [certificated, setCertificated] = useState(route.params.certificated);
  const [certTime, setCertTime] = useState(route.params.certTime);
  const [openCert, setOpenCert] = useState(false);
  const [openCoupon, setOpenCoupon] = useState(false);
  const [storeInfo, setStoreInfo] = useState({});
  const [banner, setBanner] = useState([]);
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
        if (certificated)
          setOpenCoupon({n: coupon.n, discount: coupon.discount});
      }}
      certificated={certificated}
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
        if (snapshot.val()) {
          setCertTime(snapshot.val());
          if (new Date() - new Date(snapshot.val()) <= 86400*1000)
            setCertificated(true);
          else setCertificated(false);
        } else {
          setCertTime(null);
          setCertificated(false);
        }
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

  useEffect(() => {
    Promise.all([
      storage().ref(`images/${storeName}/1.jpg`).getDownloadURL(),
      storage().ref(`images/${storeName}/2.jpg`).getDownloadURL(),
      storage().ref(`images/${storeName}/3.jpg`).getDownloadURL(),
    ]).then(
      res => {
        setBanner([res[0], res[1], res[2]])
      }
    )
  }, [])

  return (
    <SafeAreaView>
      <SliderBox 
        images ={banner} 
        sliderBoxHeight={292}
        dotColor="#FFFFFF" 
        inactiveDotColor="lightgray" 
        dotStyle={styles.sliderdot}
      />
      <ScrollView 
        style={{
          height: 
            certificated ? 
              Dimensions.get("window").height*(349/844) : Dimensions.get("window").height*(349/844)
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
                {certificated ? <View>{buttonList}</View>:<View>{buttonList}</View>}
              </>
            )}
        </View>
      </ScrollView>
      {certificated ? <View style={{opacity: 0.3,}}><Footer buttonText={"관람 인증완료"} disable_touch={true}/></View>:
      <Footer onPress={() => {setOpenCert(true)}} buttonText={"관람 인증하기"} disable_touch={false}/>}
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
        onPressCoupon={() => {setOpenCoupon(false)}}
        userToken={userToken}
        certTime={certTime}
        storeName={storeName}
      />
 
    </SafeAreaView>
  );
}

export default DetailScreen;
