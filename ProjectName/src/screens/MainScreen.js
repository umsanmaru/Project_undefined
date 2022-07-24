import React, {useState, useEffect, useContext} from 'react';
import {Button, Platform, SafeAreaView,Dimensions, ScrollView,Text,View,Image,TouchableOpacity, Modal, KeyboardAvoidingView, TextInput} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/Feather';
import { styles } from './Style';
import { AuthContext } from '../App';



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
  <View style ={{borderColor: "#EDEDEE", borderTopWidth: 1, paddingHorizontal: 32, paddingTop: 16,height: 102, width: "100%", zIndex: 100}}>
    <TouchableOpacity onPress={onPress}>
      <View style={{backgroundColor: "#4769EE", paddingVertical: 16, alignItems: "center", borderRadius: 16}}>
        <Text style={{color: "white", fontSize: 16, fontWeight: "700"}}>관람 인증하기</Text>
      </View>
    </TouchableOpacity>
  </View>
);

const Cert_Modal = ({onPress, OpenCert, onPress_cert})=>(
  <Modal animationType='fade' visible={OpenCert} transparent={true} presentationStyle='overFullScreen' style={{zIndex: 1,}}>
    <KeyboardAvoidingView behavior="position" style={{ height: Platform.OS === 'android' ? Dimensions.get('window').height: '100%',}}>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.modal}>
          <View style ={styles.modalwhitepart}>
            <Text style={styles.textinmodal}>티켓 코드 입력</Text>
            <TextInput eyboardType='numeric' placeholder="티켓 앞장 하단의 코드를 입력하세요" placeholderTextColor="#B1AEAE" style={styles.textinputbox}></TextInput>
            <Footer onPress={onPress_cert}></Footer>
          </View>
        </View>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  </Modal>
);

const MainScreen= ({navigation}) => {

  const { signOut } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(true);
  const [currentExhibit, setCurrentExhibit] = useState('성수/AWA');
  
  useEffect(() => {
    setIsLoading(true)
    setTimeout(()=>setIsLoading(false), 1000);
  }, [currentExhibit]);
  
  const amount = 7 // amounts of shops

  var row_step
  const id = []

  for(row_step=1; row_step<amount/2; row_step++){
    id.push([1,1]);
  }
  if(amount%2==1){id.push([1,0]);}

  const info = {
    storeName: '쏘리에스프레소바',
    storeCategory: '카페, 디저트',
    min: 10,
    max: 15,
    imgSrc: 'banner-3'
  }

  const buttonList = id.map((button)=> (
    <View style ={styles.RowContainer}>
      {button[0] ?  <AppButton navigation={navigation} info={info}/> : <View/>}
      {button[1] ?  <AppButton navigation={navigation} info={info}/> : <View/>}
    </View>)
  )
  const seesaw = ["성수/AWA", "서촌/Red Room", "명동/Poethic AI"]
  const [Certificate, setCertificate] = useState(false); //해당 계정이 관람 인증이 되었는지
  const [OpenCert, setOpenCert] = useState(false); // 티켓 인증 모달의 상태

  return (
    <SafeAreaView style={{flex: 1, paddingTop: Platform.OS === 'android' ? 8 : 0,}}>
      <View style ={styles.Header}>
        <View style ={styles.DefaultHeader}>
          <SelectDropdown data={seesaw} onSelect={(selectedItem, index) => {console.log(selectedItem, index)}}
          buttonTextAfterSelection={(selectedItem) => {return selectedItem}} rowTextForSelection={(item) => {return item}}
          renderDropdownIcon ={() => {
            return (<Icon name="chevron-down" color={"black"} size={18} style={{marginRight: 32}}/>);}}
          dropdownIconPosition="right"/>
        </View>
        {/* {Certificate ? <View/>:<UnsignedHeader onPress={()=> {setOpenCert(true)}}/>} */}
        {Certificate ? <View/>:<UnsignedHeader onPress={signOut}/>}
      </View>
      <ScrollView style={{zIndex: 0}}>
          <View style={{paddingBottom: 32}}>{buttonList}</View>
      </ScrollView>
      <Cert_Modal OpenCert={OpenCert} onPress={()=> {setOpenCert(false)}} onPress_cert={()=> {setCertificate(true); setOpenCert(false);}}/>
    </SafeAreaView>
  );
};

export default MainScreen;
