import React, { useContext } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, Image } from 'react-native';
import { AuthContext } from '../App';

const LoginScreen= () => {
  const { signInGoogle, signInKakao } = useContext(AuthContext);

  return (
    <SafeAreaView>
      <View style={{height: "100%", alignItems: "center", justifyContent: "center", }}>
        <TouchableOpacity onPress={signInGoogle}>
        <View style={{ width: 326, height: 52, backgroundColor: "white", 
        borderRadius: 12, borderWidth: 1, borderColor: "#B1AEAE",
      flexDirection:"row", alignItems:"center", justifyContent:"center"}}>
          <Image source={require('ProjectName/src/images/flat-color-icons_google.png')}
          style={{resizeMode:"contain", width: 32, marginRight: 12,}}/>
          <Text style={{fontSize: 16, fontWeight: "700"}}>구글로 로그인하기</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={signInKakao}>
        <View style={{ width: 326, height: 52, backgroundColor: "#FAE301", 
        borderRadius: 12, marginTop: 12,
      flexDirection:"row", alignItems:"center", justifyContent:"center"}}>
          <Image source={require('ProjectName/src/images/ri_kakao-talk-fill.png')}
          style={{resizeMode:"contain", width: 32, marginRight: 12,}}/>
          <Text style={{fontSize: 16, fontWeight: "700"}}>카카오톡으로 로그인하기</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
