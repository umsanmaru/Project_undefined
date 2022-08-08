import React, { useEffect, useMemo, useReducer, createContext } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from './screens/MainScreen';
import CertScreen from './screens/CertScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator } from 'react-native';
import database from '@react-native-firebase/database';

export const AuthContext = createContext();

const storeData = async (value) => {
  try {
    console.log(value)
      await AsyncStorage.setItem('inputcode', value)
  } catch (e) {
      // saving error
  }
}

const getData = async () => {
  try {
    console.log('getdat')
      const value = await AsyncStorage.getItem('inputcode')
      console.log("valeu", value)
      if(value !== null) {
          return value
      } else return false;
  } catch(e) {
    console.log(e)
      // error reading value
  }
}


const Stack = createStackNavigator();

const App = () => {
  const [state, dispatch] = useReducer(
		(prevState, action) => {
			switch (action.type) {
				case 'RESTORE_TOKEN':
					return {
						...prevState,
						userToken: action.token,
						isLoading: false,
            storeCodes: action.codes,
            storeName: action.storeName,
					};
				case 'SIGN_IN':
					return {
						...prevState,
						userToken: action.token,
            storeName: action.storeName,
					};
			}
		},
		{
			isLoading: true,
			userToken: null,
      storeCodes: {},
      storeName: null,
		} 
	);

  useEffect(() => {
    database()
      .ref('/storeCodes/')
      .once('value')
      .then((snapshot) => {
        const codes = snapshot.val();
        const fetchData = async (codes) => {
          const localcode = await getData();
          console.log(localcode);
          if (localcode) {
            dispatch({ 
              type: 'RESTORE_TOKEN', token: localcode,  codes: codes, storeName: codes[localcode] 
            });
          } else {
            dispatch({ type: 'RESTORE_TOKEN', token: null, codes: codes, storeName: null });
          }
        }
        fetchData(codes)
      })
      .catch((e) => {
        console.log(e.message);
      })
  }, [])

  const authContext = useMemo(
		() => ({
			signIn: (inputcode) => {
				dispatch({type: 'SIGN_IN', token: inputcode, storeName: state.storeCodes[inputcode]});
        storeData(inputcode);
			},
			storeCodes: state.storeCodes,
      storeName: state.storeName,
		}),
		[state.storeCodes]
	);

  return state.isLoading ? <ActivityIndicator/> : (
      <AuthContext.Provider value={authContext}>
        <NavigationContainer>
        <Stack.Navigator screenOptions = {{ cardStyle: {backgroundColor: 'white'} }} >
          {
            !state.userToken ? 
              <Stack.Screen name="CERT" options={{headerShown: false}} component={CertScreen}/>
              :<Stack.Screen name="MAIN" options={{headerShown: false}} component={MainScreen}/>
          }
        </Stack.Navigator>
        </NavigationContainer>
      </AuthContext.Provider>
  );
};

export default App;
/* src/App.js */

