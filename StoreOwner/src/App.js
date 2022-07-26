import * as React from 'react';
import {useNavigation, NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from './screens/MainScreen';
import CertScreen from './screens/CertScreen';


const Stack = createStackNavigator();

const App = () => {

  return (
      <NavigationContainer>
      <Stack.Navigator screenOptions = {{ cardStyle: {backgroundColor: 'white'} }} >
        <Stack.Screen name="CERT" options={{headerShown: false}} component={CertScreen}/>
        <Stack.Screen name="MAIN" options={{headerShown: false}} component={MainScreen}/>
      </Stack.Navigator>
      </NavigationContainer>
  );
};

export default App;
/* src/App.js */

