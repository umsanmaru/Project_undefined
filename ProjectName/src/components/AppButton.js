import React, {useState, useEffect} from "react";
import { styles } from "../screens/Style";
import { View,Image, TouchableOpacity, Dimensions } from 'react-native';
import storage from '@react-native-firebase/storage';
import { defaultFontText as Text } from './Text';
import { defaultBoldText as BoldText} from './BoldText';
import { useRef } from 'react'
import ContentLoader, { Rect } from 'react-content-loader/native';

const AppButton = ({ navigation, certificated, certTime, userToken, currentExhibit, info }) => {

  const [url, setUrl] = useState();
  const isMounted = useRef(false);
  const [imageLoad, setImageLoad] = useState(false);
  const imageSize = Dimensions.get('window').width/2-40;

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
      {!imageLoad ? 
      <ContentLoader width={imageSize} height={imageSize+8} style={{position:"absolute"}} >
        <Rect width={imageSize} height={imageSize} ></Rect>
      </ContentLoader> : <View/>}
      <View style={{zIndex: -10, }}>
        <Image
          width= {Dimensions.get('window').width/2-40}
          height= {Dimensions.get('window').width/2-40}
          resizeMethod="resize"
          style={styles.PictureContainer}
          source={{ uri: url }}
          onLoadEnd={() => {setImageLoad(true);}}
        />
      <View style={styles.DiscountBar}>
        <BoldText style={styles.DiscountNumber}>{`${info.min}~${info.max}%`}</BoldText>
      </View>
        <BoldText style={styles.Name}>{info.storeName}</BoldText>
        <Text style ={styles.Info}>{info.storeCategory}</Text>
        </View>
    </TouchableOpacity>
    </View>
  );
};

export default AppButton;