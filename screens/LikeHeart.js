import React, { useState,useEffect } from 'react';
import { View, Text, TextInput, Button,Image,TouchableOpacity,ActivityIndicator  } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { checkIfUserLoggedIn } from './utils';
import { LOGIN_URL,Image_URL } from './apiUrls';
import makeApiRequest from './api';

import styles from '../css/styles';

function LikeHeart({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); 
  
  let[isLoading,setIsLoading] = useState(false);
  let[hold,setHold] = useState(false);
  const [validationError, setValidationError] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    checkLoginStatus();
  }, []);

  async function checkLoginStatus() {
	setHold(true);
	const timer = setTimeout(() => {
      // Navigate to the profile screen after 2 seconds
      setHold(false)
    }, 1000); 
    const isLoggedIn = await checkIfUserLoggedIn();
    if (isLoggedIn) {
      //navigation.navigate('Profile');
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
    fetch('https://leadforest.net/cristano/public/api/login_user', {
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
				email: data.email,
				profile_picture: profile_img
			};
			AsyncStorage.setItem('sessionData', JSON.stringify(sessionData));
			AsyncStorage.setItem('user_token', data.token);		
			AsyncStorage.setItem('profile_picture',profile_img);   
			console.log('asdfsadf');
			console.log(profile_img);
			navigation.navigate('ProfileScreen');
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
		
			
    </View>

  );
}

export default LikeHeart;
