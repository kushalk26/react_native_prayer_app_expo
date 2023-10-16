import React, { useState,useEffect,useRef } from 'react';
import { View, Text, TextInput, Button,Image,TouchableOpacity,ActivityIndicator  } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { checkIfUserLoggedIn } from './utils';
import makeApiRequest from './api';
import { HeaderBackButton } from '@react-navigation/stack';

import { BackHandler } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';

import { LOGIN_URL,Image_URL } from './apiUrls';

import * as WebBrowser from "expo-web-browser";

import * as Linking from "expo-linking"

import styles from '../css/styles';
import { WebView } from "react-native-webview";  
// import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';



function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); 
  const isFocused = useIsFocused(); 
  let[isLoading,setIsLoading] = useState(false);
  let[hold,setHold] = useState(false);
  const [validationError, setValidationError] = useState('');
  const YOUR_CLIENT_ID = "914001881347-taocoih2krj0o663fafpnh5uugdgdhm5.apps.googleusercontent.com";
  const YOUR_REDIRECT_URI = "https://prayerboxdrop.com/redirect.php";
  const REDIRECT_URI = "https://prayerboxdrop.com/redirect.php";
  //const callbackUrl = Linking.createURL("App", { scheme: "PrayerBoxDropn" })
  const callbackUrl = Linking.createURL("App", { scheme: "myapp" })
  const [result, setResult] = useState(null);
  
  const webViewRef = useRef(null)
  
  const goback = () => {
    webViewRef.current.goBack();
  };
  
  


  
	/*const handlePress = async () => {
		const result = await WebBrowser.openAuthSessionAsync(
        `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${YOUR_CLIENT_ID}&redirect_uri=${YOUR_REDIRECT_URI}&scope=https://www.googleapis.com/auth/userinfo.email%20https://www.googleapis.com/auth/userinfo.profile&access_type=offline&state=1234_purpleGoogle&prompt=consent`,
        REDIRECT_URI
      );  
	  console.log('result');
	  console.log(result);
	}*/
	
	
	const handlePress = async () => {
		//Linking.openURL('PrayerBoxDropn://Register');
		// Your existing code to open the browser for authentication
		setResult(await WebBrowser.openAuthSessionAsync(
		  `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${YOUR_CLIENT_ID}&redirect_uri=${YOUR_REDIRECT_URI}&scope=https://www.googleapis.com/auth/userinfo.email%20https://www.googleapis.com/auth/userinfo.profile&access_type=offline&state=1234_purpleGoogle&prompt=consent`,
		  YOUR_REDIRECT_URI
		));
		
		
		  if (result.type === "success") {

				// get back the params from the url
				const params = Linking.parse(result.url);

				const { email, name, picture } = params.queryParams;

				//pass in all the user data in an object...
				const user = {
				  email,
				  name,
				  picture,
				};

				console.log(user);


		}
		
		/*let result = await WebBrowser.openBrowserAsync(`https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${YOUR_CLIENT_ID}&redirect_uri=${YOUR_REDIRECT_URI}&scope=https://www.googleapis.com/auth/userinfo.email%20https://www.googleapis.com/auth/userinfo.profile&access_type=offline&state=1234_purpleGoogle&prompt=consent`,callbackUrl);
		setResult(result);*/
		
		/*setResult(
		  await WebBrowser.openAuthSessionAsync(`https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${YOUR_CLIENT_ID}&redirect_uri=${YOUR_REDIRECT_URI}&scope=https://www.googleapis.com/auth/userinfo.email%20https://www.googleapis.com/auth/userinfo.profile&access_type=offline&state=1234_purpleGoogle&prompt=consent`,
			callbackUrl
		  )
		)*/
		
		/*let result = await WebBrowser.openBrowserAsync('https://expo.dev');
		setResult(result);
		 */
		 
		/*const url = 'https://www.example.com'; // Replace with the URL you want to open
		 try {
		  const supported = await Linking.canOpenURL(`https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${YOUR_CLIENT_ID}&redirect_uri=${YOUR_REDIRECT_URI}&scope=https://www.googleapis.com/auth/userinfo.email%20https://www.googleapis.com/auth/userinfo.profile&access_type=offline&state=1234_purpleGoogle&prompt=consent`);
		  if (supported) {
			await Linking.openURL(`https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${YOUR_CLIENT_ID}&redirect_uri=${YOUR_REDIRECT_URI}&scope=https://www.googleapis.com/auth/userinfo.email%20https://www.googleapis.com/auth/userinfo.profile&access_type=offline&state=1234_purpleGoogle&prompt=consent`);
		  } else {
			console.error('Cannot open URL:', `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${YOUR_CLIENT_ID}&redirect_uri=${YOUR_REDIRECT_URI}&scope=https://www.googleapis.com/auth/userinfo.email%20https://www.googleapis.com/auth/userinfo.profile&access_type=offline&state=1234_purpleGoogle&prompt=consent`);
		  }
		} catch (error) {
		  console.error('Error opening link:', error);
		}

		
		console.log('resultd');
		console.log(result);*/
		
			/* await GoogleSignin.hasPlayServices();
			const userInfo = await GoogleSignin.signIn();
			setState({ userInfo }); */
		
		
  };
  
  const [isSubmitting, setIsSubmitting] = useState(false);  
  
	useEffect(() => {
		checkLoginStatus();
		console.log("result");
		console.log(result);
		
		
		const disableBackButton = () => true; // Disable back button by returning true

		navigation.setOptions({
		  headerLeft: null, // Disable the back button
		});

		const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
		  if (isFocused) {
			return true; // Return true to prevent going back
		  }
		});

		return () => {
		  navigation.setOptions({
			headerLeft: undefined, // Revert the headerLeft option when the component unmounts
		  });
		  backHandler.remove(); // Remove the event listener when the component unmounts
		};
		
		// GoogleSignin.configure({
		  // webClientId: 'YOUR_WEB_CLIENT_ID',
		  // offlineAccess: true,
		// });
		
		
			// Listen for incoming URL changes
		const handleRedirect = async (event) => {
		  if (event.url) {
			const { path, queryParams } = Linking.parse(event.url);
			if (path === '/google') {
			  // Handle the query parameters (queryParams) here
			  const { code } = queryParams;
			  // You can now send the authorization code back to the server to get the user data
			  // For example, you can make a POST request to your PHP file with the code as a parameter
			  // Remember to handle the response from the PHP file in your Expo app
			}
		  }
		};

		// Add the event listener for incoming URLs
		Linking.addEventListener('url', handleRedirect);

		// Remove the event listener when the component is unmounted
		return () => {
		  Linking.removeEventListener('url', handleRedirect);
		};
		
		
	}, [navigation, isFocused,result]);
	
	
	const handleGoogleLogin = async () => {
		alert("User construction");
	};

  async function checkLoginStatus() {
	setHold(true);
	const timer = setTimeout(() => {
      // Navigate to the profile screen after 2 seconds
      setHold(false)
    }, 1000); 
	const first_screen = await AsyncStorage.getItem('first_screen');
    const isLoggedIn = await checkIfUserLoggedIn();
    if (isLoggedIn) {
      // navigation.navigate('Profile');
	  if(first_screen){
		
		navigation.navigate('FirstScreen');  
	  } else{
		navigation.navigate('ProfileScreen');  
	  }
	  
    }
  }
	

  const handleLogin = async() => { 
	  
	//login request
	setValidationError('');
	if (!email || !password) {
      setValidationError('Please fill in all fields');
      return;
    }
	
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
		setValidationError('Please enter correct email');
		return;
    }
	
	setIsSubmitting(true);
	setIsLoading(true);
	let requestBody = {"email":email,"password":password};
	// Make the POST request
    fetch(LOGIN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
      .then(response => response.json()) 
      .then(data => {
		setIsLoading(false);
		setIsSubmitting(false);
		
		if(data.message){			
			
			setValidationError('');
			let profile_img='';
			if(data.profile_picture){
				profile_img = data.profile_picture;
			}
			const sessionData = {
				user_token: data.token,
				user_id: data.user_id,
				name: data.name,
				email: data.email				
			};
			AsyncStorage.setItem('sessionData', JSON.stringify(sessionData));
			AsyncStorage.setItem('user_token', data.token);		
			AsyncStorage.setItem('profile_picture',profile_img);
			
			if(data.login_time==''){
				navigation.navigate('ProfileScreen');
			} else{
				AsyncStorage.setItem('first_screen','first_test');
				navigation.navigate('FirstScreen');
			}
			
			return false;
		} 
		if(data.error){			
			console.log(data.error);
			console.log('data.error');
			setValidationError(data.error);
			setIsLoading(false);
			setIsSubmitting(false);
			return false;
		}
       
      })
      .catch(error => {
		setIsLoading(false);
		setIsSubmitting(false);
		setValidationError('Problem while login with this profile');
        
      });
	 
  };
   
  return ( 
    <View style={styles.mainContainer}>
		<Image source={require('../assets/logo-church.png')} style={styles.logo_image} />
			{validationError ? (
				<View style={styles.errorContainer}>
				  <Text style={styles.errorText}>{validationError}</Text>
				</View> 	
			) : null}	
			 
			
			{hold ? (
				
				  <ActivityIndicator size="large" color="#68370E" style={styles.activityIndicator} />
				
			) : (
				<View style={styles.boxContainer}>
					<Text style={styles.title}>Login</Text> 
					<TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
					<TextInput style={styles.input} placeholder="Password" onChangeText={setPassword} secureTextEntry/>
					
					
					{isSubmitting ? (
						<View style={[styles.login, styles.disabledButton]}>
						  <Text style={styles.linkSubmit}>Please wait...</Text>
						</View>
						) : (				
						<TouchableOpacity activeOpacity={0.7} style={styles.login} onPress={handleLogin}>
							<Text style={styles.loginText}>Login</Text>				
						</TouchableOpacity> 
						
					)}
					
					{isLoading && (
						<ActivityIndicator size="large" color="#68370E" style={styles.activityIndicator} />
					)} 
					
					<TouchableOpacity
					  onPress={handlePress}
					  >
						<View style={styles.circle}>
						  <Text style={styles.text}>G</Text>
						</View>
					</TouchableOpacity>
					
					
					
					<View style={styles.lrContainer}>
						<TouchableOpacity onPress={() => navigation.navigate('ForgetPassword')}>
							<Text style={styles.linkText}>Forget Password</Text>
						</TouchableOpacity>
					</View>
				
					<View style={styles.registerContainerText}>
						<Text>Don't have an account? </Text>
						<TouchableOpacity onPress={() => navigation.navigate('Registration')}>
							<Text style={styles.linkTextRegister}>Register</Text>
						</TouchableOpacity>
						
						
					</View>

				</View>
				
			)}		
			
    </View>

  );
}

export default LoginScreen;
