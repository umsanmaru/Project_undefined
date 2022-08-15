import React, { useState, useEffect, useContext , } from 'react';
import { Button, Platform, ScrollView, View, ActivityIndicator, Dimensions,  TouchableOpacity} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/Feather';
import { styles } from './Style';
import { AuthContext } from '../App';
import database from '@react-native-firebase/database';
import { certificateTicket } from '../ticketCertificate';

import UnsignedHeader from '../components/UnsignedHeader';
import SignedHeader from '../components/SignedHeader';
import AppButton from '../components/AppButton';
import CertModal from '../components/CertModal';

import ContentLoader, {Rect, Circle} from 'react-content-loader/native';
import { SafeAreaView } from 'react-native';
const isDebugging = false;

const MainScreen= ({navigation}) => {

  const { signOutGoogle, signOutKakao, userToken } = useContext(AuthContext);

  const [isLoadingStores, setIsLoadingStores] = useState(true);
  const [isLoadingCert, setIsLoadingCert] = useState(true);
  const [isLoadingExhibitNames, setIsLoadingExhibitNames] = useState(true);
  const [exhibitNames, setExhibitNames] = useState([]);
  const [currentExhibit, setCurrentExhibit] = useState("");
  const [storeList, setStoreList] = useState([]);
  const [certificateList, setCertificateList] = useState({});
  const [certificated, setCertificated] = useState(false);
  const [certTime, setCertTime] = useState(null);
  const [openCert, setOpenCert] = useState(false);

  const imageSize = Dimensions.get('window').width/2-40;

  const cancleCert = () => {
    database().ref(
      `/users/${userToken}/certificate/${currentExhibit.replace('/', '_')}/`).set(false);
  }

  useEffect(() => {
    if (currentExhibit && certificateList) {
      const curExh = currentExhibit.replace('/', '_');
      const certTime = certificateList[curExh];
      const curTime = new Date();
      
      if ( certTime || curTime - new Date(certTime) <= 86400000 ) {
        setCertTime(certTime)
        setCertificated(true);
      } else {
        setCertificated(false);
        setCertTime(null);
      }
    }},
    [certificateList, currentExhibit]
  );

  useEffect(() => {
    database()
      .ref('/exhibitionNames/')
      .once('value')
      .then(snapshot => {
        if (snapshot.val()) {
          setExhibitNames(snapshot.val());
          setCurrentExhibit(snapshot.val()[0].replace('_', '/'));
        }
        setIsLoadingExhibitNames(false);
      });
  }, []);

  useEffect(() => {
    if (!currentExhibit) return;
    setIsLoadingStores(true);
    database()
      .ref(`/exhibitions/${currentExhibit.replace('/', '_')}`)
      .once('value')
      .then(snapshot => {
        if (snapshot.val())
          setStoreList(snapshot.val());
        setIsLoadingStores(false);
      })
  }, [currentExhibit]);

  useEffect(() => {
    setIsLoadingCert(true);
    database()
      .ref(`/users/${userToken}/certificate/`)
      .on('value', snapshot => {
        if (snapshot.val())
          setCertificateList(snapshot.val());
        else 
          setCertificateList([]);
        setIsLoadingCert(false);
      })
  }, []);

  const id = [];
  const numStore = storeList.length;

  for(var row_step=1; row_step<=numStore/2; row_step++){
    id.push([row_step*2-1, row_step*2]);
  }
  if(numStore%2==1) {id.push([numStore, 0]);}

  const buttonList = id.map((button, index)=> (
    <View key={index} style ={styles.RowContainer}>
      {button[0] ?  
        <AppButton 
          navigation={navigation} 
          certificated={certificated}
          certTime={certTime}
          userToken={userToken}
          currentExhibit={currentExhibit}
          info={storeList[button[0]-1]}
        /> : <View/>}
      {button[1] ?  
        <AppButton 
          navigation={navigation} 
          certificated={certificated}
          certTime={certTime}
          userToken={userToken}
          currentExhibit={currentExhibit}
          info={storeList[button[1]-1]}
        /> : <View/>}
    </View>)
  );

  const LoadingList = id.map((button, index)=> (
    <ContentLoader key={index}>
        <Rect x="32" y={10} width={imageSize} height={imageSize}></Rect>
        <Rect x="40" y={18+imageSize} width={imageSize-16} height="16"></Rect>
        <Rect x="40" y={42+imageSize} width={imageSize-16} height="12"></Rect>
        <Rect x={Dimensions.get('window').width-187} y="10" width={imageSize} height={imageSize}></Rect>
        <Rect x={Dimensions.get('window').width-179} y={28+imageSize} width={imageSize-16} height="16"></Rect>
        <Rect x={Dimensions.get('window').width-179} y={42+imageSize} width={imageSize-16} height="12"></Rect>
        </ContentLoader>
  )
  );

  return (
    <SafeAreaView style={{}} >
      {isDebugging ? (
        <>
          <Button title={'kakaoSignOut'} onPress={signOutKakao} />
          <Button title={'googleSignOut'} onPress={signOutGoogle} />
        </>
      ): <View/>}
      <View style ={styles.Header}>
        <View style ={styles.DefaultHeader}>
          {
            isLoadingExhibitNames ? 
            <View style={{ width: "100%", paddingBottom: 14,}}>
              <ContentLoader height={29} >
                <Rect x="0" y="0" width="129" height="29" />
              </ContentLoader> 
              </View>
              : (
              <SelectDropdown 
                data={exhibitNames} 
                onSelect={(selectedItem) => {setCurrentExhibit(selectedItem)}}
                buttonTextAfterSelection={(selectedItem) => {return selectedItem}} 
                rowTextForSelection={(item) => {return item}}
                renderDropdownIcon ={() => {
                  return (
                    <Icon name="chevron-down" color={"black"} size={18} style={{left: 0}}/>
                  );
                }}
                dropdownIconPosition="right"
                defaultButtonText={currentExhibit}
              />
            )
          }
        </View>
        {isLoadingCert || certificated == null ? 
        <View style ={{paddingHorizontal: 32, height: 72, marginBottom: 16}}>
          <ContentLoader>
            <Rect width="100%" height ="72"></Rect>
          </ContentLoader>
        </View>
        : (certificated ? <SignedHeader certTime={certTime} cancleCert={cancleCert}/>
            :<UnsignedHeader onPress={()=>setOpenCert(true)}/>)}
      </View>
      {isLoadingStores ? 
        <ScrollView style={{paddingBottom: 32, zIndex: 0}}>
            <View style={{ width: "100%", height:imageSize+68,}}>{LoadingList}</View>
        </ScrollView>
        : (<ScrollView style={{zIndex: 0}}>
            <View style={{paddingBottom: 32}}>{buttonList}</View>
          </ScrollView>)}
      <CertModal 
        openCert={openCert} 
        setOpenCert={setOpenCert}
        onPress={()=> {setOpenCert(false)}} 
        onPressCert={certificateTicket}
        buttonText={"관람 인증하기"}
        userToken={userToken}
        currentExhibit={currentExhibit.replace('/', '_')}
      />
    </SafeAreaView>
  );
};

export default MainScreen;
