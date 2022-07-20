import React, {useState, useEffect} from 'react';
import {SafeAreaView,ScrollView,StyleSheet,Text,View,Image,TouchableOpacity, Modal, KeyboardAvoidingView, TextInput, ActivityIndicator} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/Feather';

const styles = StyleSheet.create({
  ButtonContainer: {
    height: 155+12+16+16,
    width: 155,
    //backgroundColor: "lightblue",
    display: 'flex',
    alignItems: 'flex-start',
  },
  PictureContainer: {
    backgroundColor: "lightblue",
    borderRadius: 16,
    width: 155,
    height: 155,
  },
  Name: {
    color: "#212121",
    //backgroundColor: "lightblue",
    fontWeight: 'bold',
    fontSize: 16,
    left: 8,
    top: 12,
    width: 139,

  },
  Info: {
    color: '#8F8F8F',
    //backgroundColor: "pink",
    fontSize: 12,
    top: 16,
    left: 8,
    width: 139,
  },
  DiscountBar: {
    backgroundColor: "#4769EE",
    position: 'absolute',
    height: 27,
    top: 24, left: 75,
    width: 80, borderBottomLeftRadius: 10, borderTopLeftRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  DiscountNumber:{
    color: "white",
    fontSize: 16,
    fontWeight: '500',
    right: 8,
  },
  RowContainer: {
    flexDirection: 'row',
    marginHorizontal: 32,
    marginVertical: 10,
    justifyContent: 'space-between',
    //alignItems: 'center',
  },
  UnsignedContainer: {
    backgroundColor: "#B1AEAE",
    marginHorizontal: 32,
    height: 72,
    alignItems: 'center',
    flexDirection: 'row', 
    justifyContent: 'center',
    borderRadius: 16, 
  },
  UnsignedText: {
    fontWeight: '700',
    fontSize: 16,
    color: "white",
  },
  DefaultHeader: {
    flexDirection: 'row', 
    justifyContent: 'flex-start',
    paddingHorizontal: 32,
  },
  Header: {
    borderBottomWidth: 1,
    borderColor: '#EDEDEE',
    paddingBottom: 16, 
    marginBottom: 6
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
  <View style ={{borderColor: "#EDEDEE", borderTopWidth: 1, paddingHorizontal: 32, paddingTop: 16,
  height: 102, width: "100%", zIndex: 100}}>
  <TouchableOpacity onPress={onPress}>
    <View style={{backgroundColor: "#4769EE", paddingVertical: 16, alignItems: "center", borderRadius: 16}}>
      <Text style={{color: "white", fontSize: 16, fontWeight: "700"}}>관람 인증하기</Text>
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
  style={{zIndex: 1}}>
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

const MainScreen= ({navigation}) => {

  const [isLoading, setIsLoading] = useState(true);
  const [currentExhibit, setCurrentExhibit] = useState('성수/AWA');
  
  useEffect(() => {
    setIsLoading(true)
    setTimeout(()=>setIsLoading(false), 1000);
  }, [currentExhibit]);

  const id = [0, 1, 2]
  const info = {
    storeName: '쏘리에스프레소바',
    storeCategory: '카페, 디저트',
    min: 10,
    max: 15,
    imgSrc: 'banner-3'
  }
  const buttonList = id.map((button)=> (
    <View style ={styles.RowContainer}>
      <AppButton navigation={navigation} info={info}/>
      <AppButton navigation={navigation} info={info}/>
    </View>)
  )
  const seesaw = ["성수/AWA", "서촌/Red Room", "명동/Poethic AI"]
  const [Certificate, setCertificate] = useState(false);

  return (
    <SafeAreaView>
      <View style ={styles.Header}>
        <View style ={styles.DefaultHeader}>
          <SelectDropdown 
            data={seesaw} 
            onSelect={(selectedItem, index) => {
              console.log(selectedItem, index)
              setCurrentExhibit(selectedItem)
            }}
            defaultValue={currentExhibit}
            value={currentExhibit} 
            rowTextForSelection={(item) => {return item}}
            renderDropdownIcon ={() => {
              return (<Icon name="chevron-down" color={"#444"} size={18} style={{marginRight: 32}}/>);
            }}
            dropdownIconPosition="right"
          />
        </View>
        <UnsignedHeader onPress={()=> {setCertificate(true)}}></UnsignedHeader>
      </View>

      
      {
        // Check isLoading for api call
        isLoading ? <ActivityIndicator/> : (
        <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View>{buttonList}</View>
        </ScrollView>
      )}

      <Cert_Modal Certificate={Certificate} onPress={()=> {setCertificate(false)}}/>
    </SafeAreaView>
  );
};

export default MainScreen;
