import React, { useState } from 'react';
import { View, Text, TextInput, Button,Image,TouchableOpacity,Alert,ActivityIndicator  } from 'react-native';

import styles from '../css/styles';
import { REGISTRATION_URL } from './apiUrls';
import makeApiRequest from './api';
 
function RegistrationScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  //for validation and activity indicator
  
  let[isLoading,setIsLoading] = useState(false);
  const [validationError, setValidationError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRegister = () => {
    // user register api request function
	
	setValidationError('');
	setSuccess('');
	
	if (!email || !password || !name) {
      setValidationError('Please fill in all fields');
      return;
    }
   
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {		
		setValidationError('Please enter a valid email address');
		return;
    }
	if(password!=confirmPassword){
		setValidationError('Password did not match');
		return false;
	}
	
	setIsSubmitting(true);
	setIsLoading(true);
	let requestBody = {"name":name,"email":email,"password":password};
	console.log('33rrrr');
	// Make the POST request
    fetch(REGISTRATION_URL, {
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
		console.log('xvxcvxcv');
		if(data.message){
			setEmail('');
			setName(''); 
			setPassword('');
			setConfirmPassword('');
			setValidationError('');
			setSuccess("Thank you for registering with App! To complete your registration and access all the features, please complete the verification process received in your email");
			const timeout = setTimeout(() => {
				navigation.navigate('Login');
			}, 3000);
			return false;
		} 
		 
		if(data.errors.email) {
			setValidationError(data.errors.email);
			setSuccess('');
			return false;
		}
		
		if(data.errors.name){
			console.log(data.errors.name);
			setValidationError(data.errors.name);
			setSuccess('');
			return false;
		}
		
		if(data.errors.password){
			setValidationError(data.errors.password);
			setSuccess('');
			return false;
		}
	
		 
        // Handle successful response
      })
      .catch(error => {
		setIsLoading(false);
		setIsSubmitting(false);
		setSuccess('');
        console.log('Error creating post:', error);
        // Handle error
      });
	
  };
   
  return (
		<View style={styles.mainContainer}>
			<Image source={require('../assets/logo-church.png')} style={styles.logo_image} />
		<View style={styles.boxContainer}>	
		  <Text style={styles.title}>Registration</Text>
			{validationError ? (
				<View style={styles.errorContainer}>
				  <Text style={styles.errorText}>{validationError}</Text>
				</View> 	
			) : null}
			{success ? (
				<View style={styles.successContainer}>
				  <Text style={styles.successText}>{success}</Text>
				</View> 	
			) : null}
		  <TextInput
			placeholder="Name*"			
			style={styles.input}
			value={name}
			onChangeText={text => setName(text)}
		  />
		  <TextInput
			placeholder="Email*"
			value={email}
			style={styles.input}
			onChangeText={text => setEmail(text)}
		  />
		  <TextInput
			placeholder="Password*"
			style={styles.input}
			value={password}
			onChangeText={text => setPassword(text)}
			secureTextEntry
		  />
		  <TextInput
			placeholder="Confirm Password*"
			style={styles.input}
			value={confirmPassword}
			onChangeText={text => setConfirmPassword(text)}
			secureTextEntry
		  /> 
		  
		
		{isSubmitting ? (
			<View style={[styles.login, styles.disabledButton]}>
			  <Text style={styles.linkSubmit}>Submitting...</Text>
			</View>
			) : (
			
			
			<TouchableOpacity activeOpacity={0.7} style={styles.login} onPress={handleRegister}>
				<Text style={styles.loginText}>Register</Text>				
			</TouchableOpacity> 
			
		)}
		
		{isLoading && (
			<ActivityIndicator size="large" color="#68370E" style={styles.activityIndicator} />
		 )} 

		<View style={styles.registerContainerText}>
			<Text>Already have an account? </Text>
			<TouchableOpacity onPress={() => navigation.goBack()}>
				<Text style={styles.linkText}>Login</Text>
			</TouchableOpacity>
		</View>
		
	</View>

    </View>
  );
}

export default RegistrationScreen;
