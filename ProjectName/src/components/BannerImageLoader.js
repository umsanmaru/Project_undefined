import React from "react";
import ContentLoader, {Rect, } from 'react-content-loader/native';
import { View } from "react-native";

const bannerImageLoader =()=>{
    return(
    <View style={{height: 150, backgroundColor: "red", zIndex: 100,}}>
        <ContentLoader height={292}>
            <Rect width="100%" height={292}></Rect>
        </ContentLoader>
      </View>
      )

  };

  export default bannerImageLoader;