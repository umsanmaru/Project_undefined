import React, {useContext} from 'react';
import {SafeAreaView, View} from 'react-native';
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { AuthContext } from '../App';




const LoginScreen= () => {
  const { signIn } = useContext(AuthContext);

  return (
    <SafeAreaView>
      <View style={{alignItems: "center", top: 250}}>
          <GoogleSigninButton onPress={signIn} />
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
