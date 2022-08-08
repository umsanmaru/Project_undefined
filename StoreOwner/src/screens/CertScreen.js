import React, { useState, useContext } from 'react';
import { Text , SafeAreaView, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import { styles } from '../Style';
import { AuthContext } from '../App';


const CertScreen = ({navigation}) => {
    const { signIn, storeCodes } = useContext(AuthContext);
    const [inputcode, setInputcode] = useState('');
        
    const createAlert = () => {
        if (storeCodes[inputcode]) {
            console.log("asd")
            signIn(inputcode);
        }
        Alert.alert(
            storeCodes[inputcode] ? "인증 완료되었습니다" : "잘못된 코드입니다",
            inputcode,
            [ storeCodes[inputcode] ?
                { 
                    text: "확인", 
                    onPress: () => navigation.navigate("MAIN", {storeName: storeCodes[inputcode]}) 
                }:
                { text: "재입력", onPress: () => setInputcode("")}
            ]
        )
    }
    return (
        <SafeAreaView style={{flex: 1, justifyContent:"center",}}>
            <TextInput 
                placeholder="점주 코드를 입력해 주세요" placeholderTextColor="#B1AEAE" 
                style={styles.inputbox}
                onChangeText={newInput => setInputcode(newInput)}
                autoCapitalize = "none"
                defaultValue={inputcode}/>
            <View style={{height:12,}}></View>
            <TouchableOpacity style ={styles.button} onPress={createAlert}>
                <Text style={styles.button_text}>인증하기</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default CertScreen;

