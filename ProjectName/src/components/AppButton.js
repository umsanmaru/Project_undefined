import React, {useState, useEffect} from "react";
import { styles } from "../screens/Style";
import { View,Image, TouchableOpacity } from 'react-native';
import storage from '@react-native-firebase/storage';
import { defaultFontText as Text } from './Text';
import { defaultBoldText as BoldText} from './BoldText';
import { useRef } from 'react'

const AppButton = ({ navigation, certificated, certTime, userToken, currentExhibit, info }) => {
  const [url, setUrl] = useState();
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    return () => isMounted.current = false;
  }, []);

  useEffect(() => {
    storage().ref(`images/${info.storeName}/1.jpg`).getDownloadURL()
      .then( url => {
        if (isMounted.current) setUrl(url);
      });
  }, []);

  return (
    <View>
    <TouchableOpacity 
      onPress={()=>navigation.push('DETAIL', {
        storeName: info.storeName,
        certificated: certificated,
        certTime: certTime,
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