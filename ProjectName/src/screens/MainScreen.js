import React, {useState, useEffect, useContext} from 'react';
import {Button, Platform, SafeAreaView,Dimensions, ScrollView,Text,View,Image,TouchableOpacity, Modal, KeyboardAvoidingView, TextInput, ActivityIndicator} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/Feather';
import { styles } from './Style';
import { AuthContext } from '../App';
import database from '@react-native-firebase/database';


const UnsignedHeader = ({onPress}) => (
  <TouchableOpacity onPress ={onPress} style={styles.UnsignedContainer}>
    <Text style={styles.UnsignedText}>관람 인증 후 쿠폰을 자유롭게 이동하세요!</Text>
  </TouchableOpacity>
);

const AppButton = ({ navigation, info }) => (
  <View>
  <TouchableOpacity 
    onPress={()=>navigation.navigate('DETAIL', {
      storeName: info.storeName
    })} 
    style={styles.ButtonContainer}
  >
    <View style={styles.PictureContainer}>
    <Image
        style={styles.PictureContainer}
        source={require('./images/banner-3.jpeg')}
      />
    </View>
    <View style={styles.DiscountBar}>
      <Text style={styles.DiscountNumber}>{`${info.min}~${info.max}%`}</Text>
    </View>
      <Text style={styles.Name}>{info.storeName}</Text>
      <Text style ={styles.Info}>{info.storeCategory}</Text>
  </TouchableOpacity>
  </View>
);

const Footer = ({onPress}) => (
  <View style ={{
    borderColor: "#EDEDEE", 
    borderTopWidth: 1, 
    paddingHorizontal: 32, 
    paddingTop: 16,
    height: 102, 
    width: "100%", 
    zIndex: 100
  }}>
    <TouchableOpacity onPress={onPress}>
      <View style={{
        backgroundColor: "#4769EE", 
        paddingVertical: 16, 
        alignItems: "center", 
        borderRadius: 16
      }}>
        <Text style={{color: "white", fontSize: 16, fontWeight: "700"}}>관람 인증하기</Text>
      </View>
    </TouchableOpacity>
  </View>
);

const Cert_Modal = ({onPress, OpenCert, onPress_cert})=>(
  <Modal 
    animationType='fade' 
    visible={OpenCert} 
    transparent={true} 
    presentationStyle='overFullScreen' 
    style={{zIndex: 1,}}
  >
    <KeyboardAvoidingView 
      behavior="position" 
      style={{ height: Platform.OS === 'android' ? Dimensions.get('window').height: '100%',}}
    >
      <TouchableOpacity onPress={onPress}>
        <View style={styles.modal}>
          <View style ={styles.modalwhitepart}>
            <Text style={styles.textinmodal}>티켓 코드 입력</Text>
            <TextInput 
              eyboardType='numeric' 
              placeholder="티켓 앞장 하단의 코드를 입력하세요" 
              placeholderTextColor="#B1AEAE" 
              style={styles.textinputbox}
            />
            <Footer onPress={onPress_cert}></Footer>
          </View>
        </View>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  </Modal>
);

const MainScreen= ({navigation}) => {

  const { signOut, userToken } = useContext(AuthContext);

  const [isLoadingStores, setIsLoadingStores] = useState(true);
  const [isLoadingCert, setIsLoadingCert] = useState(true);
  const [isLoadingExhibitNames, setIsLoadingExhibitNames] = useState(true);
  const [exhibitNames, setExhibitNames] = useState([]);
  const [currentExhibit, setCurrentExhibit] = useState("");
  const [storeList, setStoreList] = useState([]);
  const [certificateList, setCertificateList] = useState({});

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
        setIsLoadingCert(false);
      })
  }, []);

  const id = [];
  const numStore = storeList.length;

  for(var row_step=1; row_step<=numStore/2; row_step++){
    id.push([row_step*2-1, row_step*2]);
  }
  if(numStore%2==1) {id.push([numStore, 0]);}

  const info = {
    storeName: '쏘리에스프레소바',
    storeCategory: '카페, 디저트',
    min: 10,
    max: 15,
    imgSrc: 'banner-3'
  }

  const buttonList = id.map((button)=> (
    <View style ={styles.RowContainer}>
      {button[0] ?  
        <AppButton navigation={navigation} info={storeList[button[0]-1]}/> : <View/>}
      {button[1] ?  
        <AppButton navigation={navigation} info={storeList[button[1]-1]}/> : <View/>}
    </View>)
  );
  const seesaw = ["성수/AWA", "서촌/Red Room", "명동/Poethic AI"]
  const [Certificate, setCertificate] = useState(false); //해당 계정이 관람 인증이 되었는지
  const [OpenCert, setOpenCert] = useState(false); // 티켓 인증 모달의 상태

  return (
    <SafeAreaView style={{flex: 1, paddingTop: Platform.OS === 'android' ? 8 : 0,}}>
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
        {isLoadingCert ? <ActivityIndicator/>
          : (certificateList?.currentExhibit ? <View/>:<UnsignedHeader onPress={()=>setOpenCert(true)}/>)}
      </View>
      {isLoadingStores ? <ActivityIndicator/>
        : (<ScrollView style={{zIndex: 0}}>
            <View style={{paddingBottom: 32}}>{buttonList}</View>
          </ScrollView>)}
      
      <Cert_Modal 
        OpenCert={OpenCert} 
        onPress={()=> {setOpenCert(false)}} 
        onPress_cert={()=> {setCertificate(true); setOpenCert(false);}}/>
    </SafeAreaView>
  );
};

export default MainScreen;
