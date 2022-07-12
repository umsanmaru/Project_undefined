import React, { Component } from 'react'
import {SafeAreaView, StyleSheet, Text, ScrollView, View, Button} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import {SliderBox} from 'react-native-image-slider-box';

const styles = StyleSheet.create({
  sliderdot:{
    width: 8,height: 8,borderRadius: 8,marginHorizontal: 0,
  },
  Name: {
    color: "#212121",
    fontWeight: 'bold',
    fontSize: 24,
  },
  Info: {
    color: '#8F8F8F',
    //backgroundColor: "pink",
    fontSize: 16,
    top: 4,
  },
  Address: {
    color: '#232323',
    fontSize: 16,
    marginTop: 24,
  },
  scrollview: {
    height: '100%',
    //backgroundColor: 'lightblue',
    paddingHorizontal: 32,
    paddingVertical: 24,
  },
  ButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 8,
  },
  textbutton: {
    color: "#4769EE",
    fontSize: 16,
    fontWeight: "600",
    marginRight: 12, 
  },
});
const customImg = [
  require('./images/banner-1.jpeg'),
  require('./images/banner-2.jpeg'),
  require('./images/banner-3.jpeg'),
];

const Information = ({})=> (
  <View>
  <Text style={styles.Name}>내자상회</Text>
  <Text style ={styles.Info}>카페, 디저트</Text>
  <Text style ={styles.Address}>서울 종로구 사직로10길 3 1층</Text>
  </View>
);

const TextButton = ({onPress, title}) => (
  <TouchableOpacity onPress={onPress}><Text style={styles.textbutton}>{title}</Text></TouchableOpacity>
);

class DetailScreen extends Component {
  render() {
    return (
      <SafeAreaView>
        <SliderBox images ={customImg} sliderBoxHeight={292}
        dotColor="#FFFFFF" inactiveDotColor="lightgray" dotStyle={styles.sliderdot}/>
        
        <ScrollView style={styles.scrollview}>
          <Information/>

          <View style={styles.ButtonContainer}>
            <TextButton title="카카오맵"/><TextButton title="네이버지도"/>
          </View>

        </ScrollView>
      </SafeAreaView>
      
    );
  }
}



export default DetailScreen;
