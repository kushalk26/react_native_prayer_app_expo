import React, { useState } from 'react'
import { View, Text,TouchableOpacity,TextInput,Button,Alert,ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../../css/styles';
import BottomMenu from '../menu/BottomMenu'; 
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useRoute } from '@react-navigation/native';

import { CREATE_REQUEST_URL } from '../apiUrls';
import makeApiRequest from '../api';

function CreateRequest({ navigation }) {
  let[request,setRequest] = useState('');
  let[isLoading,setIsLoading] = useState(false);
  const [validationError, setValidationError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState('');
  const createRequestData = async() => {  
  
	if (!request) {
      setValidationError('Please fill request content field');
      return;
    }	
	setValidationError('');
	setIsSubmitting(true);
	setSuccess("");
	//create api request
	let requestBody = {"request":request,'token':''};
	setIsLoading(true);
  
	const sessionData = await AsyncStorage.getItem('sessionData');
			
	if (sessionData !== null) {
		const parsedSessionData = JSON.parse(sessionData);
		
		let requestBody = {"request":request,'token':parsedSessionData.user_token,'user_id':parsedSessionData.user_id};
		
		const response = await makeApiRequest(CREATE_REQUEST_URL, 'POST', requestBody);
		var last_id = '';
		if(response.message){
			last_id = response.last_id;
			//Alert.alert("Success","Request created successfully"); 
		}
		setIsSubmitting(false);
		setIsLoading(false);
		setSuccess("Request created successfully.");
		setRequest('');
		//navigation.navigate('Profile');
		const uniqueKey = Date.now().toString();
		navigation.navigate('Requests', { key: last_id });
	}
 
  };
  
  return (		
	
	<View style={styles.Topcontainer}>
	
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
			multiline
			numberOfLines={4}
			placeholder="Add Content*"
			onChangeText={text => setRequest(text)}
			value={request}
			style={styles.textInput}      
		/>
		
		{isLoading && (
			<ActivityIndicator size="large" color="blue" style={styles.activityIndicator} />
		 )}
		<View style={styles.samen2ContainerView}> 
			
			{isSubmitting ? (
				<View style={[styles.samen1Container, styles.disabledButton]}>
				  <Text style={styles.linkSubmit}>Submit</Text>
				</View>
				) : (
				
				<TouchableOpacity activeOpacity={0.7} style={styles.samen1Container} onPress={createRequestData}>
					<Text style={styles.linkSubmit}>Submit</Text>
					{isSubmitting && <Text style={styles.submittingText}>Submitting...</Text>}
				</TouchableOpacity>
				
			)}
			
		</View> 
		
		<View style={styles.samen2ContainerView}>
			
			<TouchableOpacity style={styles.samen2Container} onPress={() => navigation.goBack()}>
				<Text style={styles.linkCancel}>Cancel</Text>
			</TouchableOpacity>
		</View>
		
		

		<BottomMenu navigation={navigation}/>
    </View>

  );
}

export default CreateRequest;
