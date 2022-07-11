import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import DetailScreen from '../screens/DetailScreen';
import MainScreen from '../screens/MainScreen';

const Stack = createStackNavigator();

const StackNavigation = () => {
  return (

      <Stack.Navigator screenOptions = {{ cardStyle: {backgroundColor: 'white'} }}>
        <Stack.Screen name="MAIN" options={{headerShown: false}} component={MainScreen}/>
        <Stack.Screen name="DETAIL" component={DetailScreen}/>
      </Stack.Navigator>

  );
};

export default StackNavigation;
