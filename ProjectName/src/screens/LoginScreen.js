import React, { useContext } from 'react';
import { SafeAreaView, View, TouchableOpacity, Image, Dimensions} from 'react-native';
import { AuthContext } from '../App';
import { defaultFontText as Text } from '../components/Text';
import { defaultBoldText as BoldText} from '../components/BoldText';


const LoginScreen= () => {
  const { signInGoogle, signInKakao } = useContext(AuthContext);
  const screen_width = Dimensions.get('window').width;
  const screen_height = Dimensions.get('window').height;

  return (
    <SafeAreaView>
      <View style={{height: "100%", alignItems: "center", }}>
        <View style={{width: "100%", alignItems: "flex-start", marginTop: screen_height*0.06 }}>
          <BoldText style={{fontSize: 32, marginHorizontal: 32, marginBottom: 14,}}>전시보고</BoldText>
          <Text style={{fontSize: 16, marginHorizontal: 32, marginBottom: 4,}}>그라운드시소의 전시들을 보고 인증하면</Text>
          <Text style={{fontSize: 16, marginHorizontal: 32,}}>전시보고와 제휴한 가게들에서 할인받을 수 있어요</Text>
        </View>

        <Image style={{resizeMode:"contain", height: Dimensions.get('window').width*0.5,
        marginTop: screen_height*0.13, 
        marginBottom: screen_height*0.18}} 
        source={require('ProjectName/src/images/Mask-group.png')}></Image>

        <TouchableOpacity onPress={signInGoogle}>
        <View style={{ width: screen_width-64, height: 52, backgroundColor: "white", 
        borderRadius: 12, borderWidth: 1, borderColor: "#B1AEAE",
      flexDirection:"row", alignItems:"center", justifyContent:"center"}}>
          <Image source={require('ProjectName/src/images/flat-color-icons_google.png')}
          style={{resizeMode:"contain", width: 32, marginRight: 12,}}/>
          <BoldText style={{fontSize: 16, color: "#232323"}}>구글로 로그인하기</BoldText>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={signInKakao}>
        <View style={{ width: screen_width-64, height: 52, backgroundColor: "#FAE301", 
        borderRadius: 12, marginTop: 12,
      flexDirection:"row", alignItems:"center", justifyContent:"center"}}>
          <Image source={require('ProjectName/src/images/ri_kakao-talk-fill.png')}
          style={{resizeMode:"contain", width: 32, marginRight: 12,}}/>
          <BoldText style={{fontSize: 16,  color:"#391B1B"}}>카카오톡으로 로그인하기</BoldText>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
