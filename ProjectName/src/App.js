import React, {useState, useEffect} from 'react';
import { ActivityIndicator, View, Button } from 'react-native';
import { NavigationContainer} from '@react-navigation/native';
import StackNavigation from './navigations/Stack';
import auth from '@react-native-firebase/auth';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';


const googleSignOut = () => {
    auth()
        .signOut()
        .then(() => console.log('User signed out!'))
}

async function onGoogleButtonPress() {
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
}

const App = () => {
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();
  
    // Handle user state changes
    function onAuthStateChanged(user) {
      setUser(user);
      if (initializing) setInitializing(false);
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
  
    if (initializing) return <ActivityIndicator />; // Logo should be displayed here

    if (!user) {
        return (
            <View style={{alignItems: "center", top: 250}}>
                <GoogleSigninButton onPress={() => onGoogleButtonPress()} />
            </View>
        );
    }
    
    console.log(user)
    return (
        <Button 
            onPress={googleSignOut}
            title={"logout"}
        />
    )
    return (
        <NavigationContainer>
            <StackNavigation />
        </NavigationContainer>
    )
}

export default App;

/* src/App.js */

