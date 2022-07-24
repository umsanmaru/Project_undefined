import * as React from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Feather';
import { Platform } from 'react-native';

import DetailScreen from '../screens/DetailScreen';
import MainScreen from '../screens/MainScreen';
import LoginScreen from '../screens/LoginScreen';

const Stack = createStackNavigator();


const StackNavigation = () => {
  const navigation=useNavigation();
  return (

      <Stack.Navigator screenOptions = {{ cardStyle: {backgroundColor: 'white'} }} >
        <Stack.Screen name="MAIN" options={{headerShown: false}} component={MainScreen}/>
        <Stack.Screen name="DETAIL" component={DetailScreen}
        options={{ headerStyle: {height: Platform.OS === "android" ? 60:105, }, 
        headerLeft: ()=><Icon name={'arrow-left'} color={"black"} onPress={ () => { navigation.goBack()}} 
        style={{ marginLeft: 24 }} size={24}/>,
        headerTitle: "", }}/>
      </Stack.Navigator>

  );
};

export default StackNavigation;
