import React, { useContext } from 'react';
import { Button, SafeAreaView, View } from 'react-native';
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { AuthContext } from '../App';

const LoginScreen= () => {
  const { signInGoogle, signInKakao } = useContext(AuthContext);

  return (
    <SafeAreaView>
      <View style={{alignItems: "center", top: 250}}>
        <GoogleSigninButton onPress={signInGoogle} />
        <Button title="카카오톡 로그인" onPress={signInKakao} />
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
