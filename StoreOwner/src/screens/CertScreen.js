import React from 'react';
import { Text , SafeAreaView, TextInput, TouchableOpacity, View} from 'react-native';
import { styles } from '../Style';

const CertScreen = ({navigation}) => {
    
    return (
        <SafeAreaView style={{flex: 1, justifyContent:"center",}}>
            <TextInput eyboardType='numeric' placeholder="점주 코드를 입력해 주세요" placeholderTextColor="#B1AEAE" style={styles.inputbox}></TextInput>
            <View style={{height:12,}}></View>
            <TouchableOpacity style ={styles.button} onPress={()=>navigation.navigate('MAIN') }>
                <Text style={styles.button_text}>인증하기</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default CertScreen;

/* src/App.js */

