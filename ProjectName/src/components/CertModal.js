import React, {useEffect, useState} from "react";
import { styles } from "../screens/Style";
import { Platform ,Dimensions, View, TouchableWithoutFeedback, TouchableOpacity, Modal, KeyboardAvoidingView, TextInput } from 'react-native';
import Footer from "./Footer";
import { defaultFontText as Text } from './Text';
import { defaultBoldText as BoldText} from './BoldText';
import { SafeAreaView } from "react-native";

const CertModal = ({
  onPress, openCert, setOpenCert, onPressCert, buttonText, userToken, currentExhibit
}) => {

  const [currentText, setCurrentText] = useState('');

  return (
  
    <Modal 
      animationType='fade'
      visible={openCert}
      transparent={true} 
      presentationStyle='overFullScreen'
      style={{zIndex: 1,}}
    >
      <KeyboardAvoidingView 
        behavior='height'
      >
      <TouchableWithoutFeedback  onPress={onPress}>
          <View style={{height: "100%", width: "100%", backgroundColor: "rgba(0, 0, 0, 0.4)", }}></View>
        </TouchableWithoutFeedback >

      
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
          <View style ={{borderColor: "#EDEDEE", borderTopWidth: 1, 
            paddingHorizontal: 32, paddingTop: 16,
            paddingBottom: Platform.OS === "android" ? 16: 32, width: "100%", 
          //position: "absolute",
        }}>
    <TouchableOpacity onPress={() => {
                  if (onPressCert(currentText, currentExhibit, userToken))
                    setOpenCert(false)
                }}>
      <View style={{
        backgroundColor: "#4769EE", 
        paddingVertical: 16, 
        alignItems: "center", 
        borderRadius: 16
      }}>
        <BoldText style={{color: "white", fontSize: 16, }}>{buttonText}</BoldText>
      </View>
    </TouchableOpacity>
  </View>
          </View>
      </KeyboardAvoidingView>
    </Modal>
     
  );

}



export default CertModal;