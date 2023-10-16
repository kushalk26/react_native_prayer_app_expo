import React, { useState } from 'react';
import { View, Text, TextInput, Button,Image,TouchableOpacity,ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { WebView } from 'react-native-webview';

import styles from '../css/styles';
import { FORGET_PASSWORD_URL,Image_URL } from './apiUrls';
import makeApiRequest from './api';

function ForgetPasswordScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [validationError, setValidationError] = useState('');
  const [success, setSuccess] = useState('');

  const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState(false);
  
  
  const handleForgetPass = async() => {
    setValidationError('');
    setSuccess('');
    setIsLoading(true);
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
		setValidationError('Please enter correct email');
		return;
    }
    console.log(email);
	let requestBody = {"email":email};	
	const response = await makeApiRequest(FORGET_PASSWORD_URL, 'POST', requestBody);
	if(response.success){
		setSuccess(response.success);
		setIsLoading(false);
	}
	if(response.error){
		console.log(response.error);
		setValidationError(response.error);
		setIsLoading(false);
		return false;
	}
	console.log(response);
	setValidationError('');
	setIsLoading(false);
  };
  
	const handleError = () => {
		setIsLoading(false);
		setIsError(true);
	};
	 const hideSpinner = () => {
		setIsLoading(false);
	};
   
  return (	
		<View style={styles.Topcontainer}>
			{isLoading && (				
				<View style={styles.container}><Text>Loading....</Text></View>
			)}
		  <WebView
			onLoad={() => hideSpinner()}
			style={{ flex: 1 }}
			source={{ uri: 'https://www.prayerboxdrop.com/forgot-password' }}
		  />
		  
		</View>
		
  );
}

export default ForgetPasswordScreen;
