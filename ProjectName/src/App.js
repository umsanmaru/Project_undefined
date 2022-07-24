import React, {useState, useEffect, useMemo, useReducer, createContext} from 'react';
import { ActivityIndicator, View, Button } from 'react-native';
import { NavigationContainer} from '@react-navigation/native';
import StackNavigation from './navigations/Stack';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './screens/LoginScreen';
import MainScreen from './screens/MainScreen'

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
                        userToken: prevState.userToken || action.token,
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
        dispatch({ type: user ? 'SIGN_IN' : 'RESTORE_TOKEN', token: user?.uid });
    }

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
                        <Stack.Screen name="MAIN" options={{headerShown: false}} component={MainScreen}/>
                    )}
                </Stack.Navigator>
            </NavigationContainer>
        </AuthContext.Provider>
    );
};






// const App_2 = () => {
//     const [initializing, setInitializing] = useState(true);
//     const [user, setUser] = useState();
  
//     // Handle user state changes
//     function onAuthStateChanged(user) {
//       setUser(user);
//       if (initializing) setInitializing(false);
//     }

//     useEffect(() => {
//         GoogleSignin.configure({
//             webClientId: "265977501020-dq10qkihc4h0nn37cmnm38l3m4l6adkr.apps.googleusercontent.com",
//         });
//     }, []);
  
//     useEffect(() => {
//       const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
//       return subscriber; // unsubscribe on unmount
//     }, []);
  
//     if (initializing) return <ActivityIndicator />; // Logo should be displayed here

//     if (!user) {
//         return (
//             <View style={{alignItems: "center", top: 250}}>
//                 <GoogleSigninButton onPress={() => onGoogleButtonPress()} />
//             </View>
//         );
//     }
    
//     console.log(user)
//     return (
//         <Button 
//             onPress={googleSignOut}
//             title={"logout"}
//         />
//     )
//     return (
//         <NavigationContainer>
//             <StackNavigation />
//         </NavigationContainer>
//     )
// }

export default App;

/* src/App.js */

