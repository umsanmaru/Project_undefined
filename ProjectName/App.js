import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View, TouchableOpacity, FlatList
} from 'react-native';

const styles = StyleSheet.create({
  ButtonContainer: {
    height: 155+12+16+16,
    width: 155,
    //backgroundColor: "lightblue",
    display: 'flex',
    alignItems: 'flex-start',
  },
  PictureContainer: {
    backgroundColor: "#F5F5F5",
    borderRadius: 16,
    width: 155,
    height: 155,
  },
  Name: {
    color: "#212121",
    //backgroundColor: "lightblue",
    fontWeight: 'bold',
    fontSize: 16,
    left: 8,
    top: 12,
    width: 139,

  },
  Info: {
    color: '#8F8F8F',
    //backgroundColor: "pink",
    fontSize: 12,
    top: 16,
    left: 8,
    width: 139,
  },
  DiscountBar: {
    backgroundColor: "#4769EE",
    position: 'absolute',
    height: 27,
    top: 24, left: 75,
    width: 80, borderBottomLeftRadius: 10, borderTopLeftRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  DiscountNumber:{
    color: "white",
    fontSize: 16,
    fontWeight: '500',
    right: 8,
  },
  RowContainer: {
    flexDirection: 'row',
    marginHorizontal: 32,
    marginVertical: 10,
    justifyContent: 'space-between',
    //alignItems: 'center',
  },
  UnsignedContainer: {
    backgroundColor: "#B1AEAE",
    marginHorizontal: 32,
    height: 72,
    alignItems: 'center',
    flexDirection: 'row', 
    justifyContent: 'center',
    borderRadius: 16, 
  },
  UnsignedText: {
    fontWeight: '700',
    fontSize: 16,
    color: "white",
  },
});

const UnsignedHeader = ({onPress}) => (
  <TouchableOpacity onPress ={onPress} style={styles.UnsignedContainer}>
    <Text style={styles.UnsignedText}>관람 인증 후 쿠폰을 자유롭게 이동하세요!</Text>
  </TouchableOpacity>
);

const AppButton = ({ onPress }) => (
  <View>
  <TouchableOpacity onPress={onPress} style={styles.ButtonContainer}>
    <View style={styles.PictureContainer}></View>
    <View style={styles.DiscountBar}>
      <Text style={styles.DiscountNumber}>10~15%</Text>
    </View>
      <Text style={styles.Name}>쏘리에스프레소바</Text>
      <Text style ={styles.Info}>카페, 디저트</Text>
  </TouchableOpacity>
  </View>
);

const App= () => {
  const id = [0, 1, 2]
  const buttonList = id.map((button)=> (<View style ={styles.RowContainer}><AppButton/><AppButton/></View>))
  return (
    <SafeAreaView>
      <UnsignedHeader></UnsignedHeader>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic">
          <View>{buttonList}</View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;