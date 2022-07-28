import React, { useState, useEffect, useContext } from 'react';
import { Button, Platform, SafeAreaView, ScrollView, View, ActivityIndicator } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/Feather';
import { styles } from './Style';
import { AuthContext } from '../App';
import database from '@react-native-firebase/database';
import { certificateTicket } from '../ticketCertificate';

import UnsignedHeader from '../components/UnsignedHeader';
import AppButton from '../components/AppButton';
import CertModal from '../components/CertModal';

const isDebugging = true;

const MainScreen= ({navigation}) => {

  const { signOutGoogle, signOutKakao, userToken } = useContext(AuthContext);
  console.log(userToken, "there")

  const [isLoadingStores, setIsLoadingStores] = useState(true);
  const [isLoadingCert, setIsLoadingCert] = useState(true);
  const [isLoadingExhibitNames, setIsLoadingExhibitNames] = useState(true);
  const [exhibitNames, setExhibitNames] = useState([]);
  const [currentExhibit, setCurrentExhibit] = useState("");
  const [storeList, setStoreList] = useState([]);
  const [certificateList, setCertificateList] = useState({});
  const [certificated, setCertificated] = useState(null); //해당 계정이 관람 인증이 되었는지
  const [openCert, setOpenCert] = useState(false); // 티켓 인증 모달의 상태

  useEffect(() => {
      setCertificated(currentExhibit 
        && certificateList && !!(certificateList[currentExhibit.replace('/', '_')]));
    },
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
    const cleanup = setIsLoadingCert(true);
    database()
      .ref(`/users/${userToken}/certificate/`)
      .on('value', snapshot => {
        if (snapshot.val())
          setCertificateList(snapshot.val());
        console.log(snapshot.val(), 'snap')
        setIsLoadingCert(false);
      })
    return cleanup
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
          userToken={userToken}
          currentExhibit={currentExhibit}
          info={storeList[button[0]-1]}
        /> : <View/>}
      {button[1] ?  
        <AppButton 
          navigation={navigation} 
          certificated={certificated}
          userToken={userToken}
          currentExhibit={currentExhibit}
          info={storeList[button[1]-1]}
        /> : <View/>}
    </View>)
  );

  console.log(certificateList)

  return (
    <SafeAreaView style={{flex: 1, paddingTop: Platform.OS === 'android' ? 8 : 0,}}>
      {isDebugging ? (
        <>
          <Button title={'kakaoSignOut'} onPress={signOutKakao} />
          <Button title={'googleSignOut'} onPress={signOutGoogle} />
        </>
      ): <View/>}
      <View style ={styles.Header}>
        <View style ={styles.DefaultHeader}>
          {
            isLoadingExhibitNames ? <ActivityIndicator/> : (
              <SelectDropdown 
                data={exhibitNames} 
                onSelect={(selectedItem) => {setCurrentExhibit(selectedItem)}}
                buttonTextAfterSelection={(selectedItem) => {return selectedItem}} 
                rowTextForSelection={(item) => {return item}}
                renderDropdownIcon ={() => {
                  return (
                    <Icon name="chevron-down" color={"black"} size={18} style={{marginRight: 32}}/>
                  );
                }}
                dropdownIconPosition="right"
                defaultButtonText={currentExhibit}
              />
            )
          }
        </View>
        {isLoadingCert || certificated == null ? <ActivityIndicator/>
          : (certificated ? <View/>:<UnsignedHeader onPress={()=>setOpenCert(true)}/>)}
      </View>
      {isLoadingStores ? <ActivityIndicator/>
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
