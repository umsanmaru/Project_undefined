import React from 'react';
import {SafeAreaView,Text,TouchableOpacity,} from 'react-native';

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
