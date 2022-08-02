import React, {useState, useEffect} from "react";
import { styles } from "../screens/Style";
import { View,Image, TouchableOpacity } from 'react-native';
import storage from '@react-native-firebase/storage';
import { defaultFontText as Text } from './Text';
import { defaultBoldText as BoldText} from './BoldText';

const AppButton = ({ navigation, certificated, userToken, currentExhibit, info }) => {
  const [url, setUrl] = useState();

  useEffect(() => {
    storage().ref(`images/${info.storeName}/1.jpeg`).getDownloadURL()
      .then( url => setUrl(url));
  }, [])
  return (
    <View>
    <TouchableOpacity 
      onPress={()=>navigation.push('DETAIL', {
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
          source={{ uri: url }}
        />
      </View>
      <View style={styles.DiscountBar}>
        <BoldText style={styles.DiscountNumber}>{`${info.min}~${info.max}%`}</BoldText>
      </View>
        <BoldText style={styles.Name}>{info.storeName}</BoldText>
        <Text style ={styles.Info}>{info.storeCategory}</Text>
    </TouchableOpacity>
    </View>
  );
};

export default AppButton;