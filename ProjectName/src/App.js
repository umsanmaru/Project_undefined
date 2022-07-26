import React, {useEffect, useMemo, useReducer, createContext} from 'react';
import { ActivityIndicator, View, Button } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Feather';
import { Platform } from 'react-native';

import LoginScreen from './screens/LoginScreen';
import MainScreen from './screens/MainScreen'
import DetailScreen from './screens/DetailScreen';

export const AuthContext = createContext();
const Stack = createStackNavigator();

async function googleSignIn() {
  const { idToken } = await GoogleSignin.signIn();
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  return auth().signInWithCredential(googleCredential);
}

async function googleSignOut() {
  await auth().signOut()
}

const App = () => {
	const [state, dispatch] = useReducer(
		(prevState, action) => {
			switch (action.type) {
				case 'RESTORE_TOKEN':
					return {
						...prevState,
						userToken: action.token,
						isLoading: false,
					};
				case 'SIGN_IN':
					return {
						...prevState,
						isSignout: false,
						userToken: action.token,
					};
				case 'SIGN_OUT':
					return {
						...prevState,
						isSignout: true,
						userToken: null,
					};
			}
		},
		{
			isLoading: true,
			isSignout: false,
			userToken: null,
		} 
	);

	const onAuthStateChanged = (user) => {
		dispatch({ type: 'RESTORE_TOKEN', token: user?.uid });
		if (user?.uid)
			dispatch({ type: 'SIGN_IN', token: user.uid });
	};

	useEffect(() => {
		GoogleSignin.configure({
			webClientId: "265977501020-dq10qkihc4h0nn37cmnm38l3m4l6adkr.apps.googleusercontent.com",
		});
	}, []);

	useEffect(() => {
		const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
		return subscriber; // unsubscribe on unmount
	}, []);

	const authContext = useMemo(
		() => ({
			signIn: async (data) => {
				googleSignIn()
			},
			signOut: () => {
				googleSignOut().then(
					dispatch({ type: 'SIGN_OUT'})
				);
			},
			userToken: state.userToken
		}),
		[state.userToken]
	);

	console.log(state, auth().currentUser.uid);

	if (state.isLoading) {
		return <ActivityIndicator/>
	}

	return (
		<AuthContext.Provider value={authContext}>
			<NavigationContainer>
				<Stack.Navigator>
					{state.userToken == null ? (
						<Stack.Screen name="LOGIN" component={LoginScreen} />
					) : (
						<>
							<Stack.Screen name="MAIN" options={{headerShown: false}} component={MainScreen}/>
							<Stack.Screen name="DETAIL" 
								component={DetailScreen}
								options={{ 
									headerStyle: {height: Platform.OS === "android" ? 60:105, }, 
									headerLeft: ()=>
										<Icon 
											name={'arrow-left'} 
											color={"black"} 
											onPress={ () => { navigation.goBack() }} 
											style={{ marginLeft: 24 }} size={24}
										/>,
									headerTitle: "", 
								}}
							/>
						</>
						
					)}
				</Stack.Navigator>
			</NavigationContainer>
		</AuthContext.Provider>
	);
};

export default App;

/* src/App.js */

