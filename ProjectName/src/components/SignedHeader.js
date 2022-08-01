import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from '../screens/Style';

const SignedHeader = ({onPress}) => (
  <View style={styles.SignedContainer}>
    <View style={{width: "100%", flexDirection: "row", alignItems:"center", justifyContent:"space-between"}}>
    <View style={{marginLeft: 12,}}>
      <Text style={styles.UnsignedText}>관람 인증 완료</Text>
      <Text style={{fontWeight: '700',fontSize: 12,color: "white",}}>2022.08.01</Text>
    </View>
    <View style={{marginRight: 12,}}>
    <Text style={styles.UnsignedText}>3시간 42분 남음</Text>
    </View>
    </View>
  </View>
);

export default SignedHeader;