import React from "react";
import { styles } from "../screens/Style";
import { Text, View,Image, TouchableOpacity } from 'react-native';

const AppButton = ({ navigation, certificated, userToken, currentExhibit, info }) => {
  return (
    <View>
    <TouchableOpacity 
      onPress={()=>navigation.navigate('DETAIL', {
        storeName: info.storeName,
        certificated: certificated,
        userToken: userToken,
        currentExhibit: currentExhibit,
      })} 
      style={styles.ButtonContainer}
    >
      <View style={styles.PictureContainer}>
      <Image
          style={styles.PictureContainer}
          source={require('../screens/images/banner-3.jpeg')}
        />
      </View>
      <View style={styles.DiscountBar}>
        <Text style={styles.DiscountNumber}>{`${info.min}~${info.max}%`}</Text>
      </View>
        <Text style={styles.Name}>{info.storeName}</Text>
        <Text style ={styles.Info}>{info.storeCategory}</Text>
    </TouchableOpacity>
    </View>
  );
};

export default AppButton;