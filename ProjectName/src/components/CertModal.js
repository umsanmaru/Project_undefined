import React, {useEffect, useState} from "react";
import { styles } from "../screens/Style";
import { Platform ,Dimensions, View, TouchableOpacity, Modal, KeyboardAvoidingView, TextInput } from 'react-native';
import Footer from "./Footer";
import { defaultFontText as Text } from './Text';
import { defaultBoldText as BoldText} from './BoldText';

const CertModal = ({
  onPress, openCert, setOpenCert, onPressCert, buttonText, userToken, currentExhibit
}) => {

  const [currentText, setCurrentText] = useState('');

  return (
    <Modal 
      animationType='none' 
      visible={openCert}
      transparent={true} 
      presentationStyle='overFullScreen'
      style={{zIndex: 1,}}
    >
      <KeyboardAvoidingView 
        behavior="position" 
        style={{ height: Platform.OS === 'android' ? Dimensions.get('window').height: '100%',}}
      >
        <TouchableOpacity onPress={onPress}>
          <View style={{height: "100%", width: "100%", backgroundColor: "rgba(0, 0, 0, 0.4)", }}></View>
        </TouchableOpacity>
            <View style ={styles.modalwhitepart}>
              <BoldText style={styles.textinmodal}>티켓 코드 입력</BoldText>
              <TextInput 
                eyboardType='numeric' 
                placeholder="티켓 앞장 하단의 코드를 입력하세요" 
                placeholderTextColor="#B1AEAE" 
                style={styles.textinputbox}
                value={currentText}
                onChangeText={setCurrentText}
              />
              <Footer 
                onPress={() => {
                  if (onPressCert(currentText, currentExhibit, userToken))
                    setOpenCert(false)
                }}
                buttonText={buttonText} 
              />
          </View>
      </KeyboardAvoidingView>
    </Modal>
  );

}



export default CertModal;