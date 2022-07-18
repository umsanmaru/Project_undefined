import React, {useState} from 'react';
import {SafeAreaView,ScrollView,StyleSheet,Text,View,Image,TouchableOpacity, Modal, KeyboardAvoidingView, TextInput} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/Feather';

const styles = StyleSheet.create({
  
});

const LoginScreen= ({navigation}) => {
  
  return (
    <SafeAreaView>
        <TouchableOpacity onPress={()=>navigation.navigate('MAIN')}
        style={{alignItems: "center", top: 250}}>
            <Text style={{fontSize: 32, fontWeight:"bold", borderColor: "#4769EE", color: "black",
            paddingHorizontal: 8,borderWidth:5}}>LOGIN</Text>
        </TouchableOpacity>
      
    </SafeAreaView>
  );
};

export default LoginScreen;
