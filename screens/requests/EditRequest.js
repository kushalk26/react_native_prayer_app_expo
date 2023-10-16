import React, { useState } from 'react'
import { Button } from 'react-native'
import { View, Text,TouchableOpacity,TextInput,Image,ScrollView,ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons'; 
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from '../../css/styles';
import BottomMenu from '../menu/BottomMenu';

import makeApiRequest from '../api';
import { UPDATE_REQUEST_URL } from '../apiUrls';

function EditRequest({ navigation }) {
  const [text, setText] = useState('');
  
  const handleTextChange = (inputText) => {
    setText(inputText);
  };
  
	const route = useRoute();
	const { item_data } = route.params;
	const [itemId, setItemId] = useState(item_data.id); 
	const [itemContent, setContent] = useState(item_data.content); 
	
	const [validationError, setValidationError] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [success, setSuccess] = useState('');
	let[isLoading,setIsLoading] = useState(false);
	
	const update_request = async () => {
		if (!itemContent) {
		  setValidationError('Please enter content');
		  return;
		}	 
		
		setValidationError('');
		setIsSubmitting(true);
		setSuccess("");
		setIsLoading(true);
		setIsSubmitting(true);
		
		const sessionData = await AsyncStorage.getItem('sessionData'); 		
		
		if (sessionData !== null) {
			
			const parsedSessionData = JSON.parse(sessionData);
			
			let requestBody = {"user_id":parsedSessionData.user_id,"user_token":parsedSessionData.user_token,"request_id":itemId,"request_content":itemContent};
			
			let response = await makeApiRequest(UPDATE_REQUEST_URL, 'POST', requestBody);
			
			setIsLoading(false);
			if(response.message){
				setIsSubmitting(false);
				
				setValidationError("");
			
				setSuccess("Request updated successfully");
				const redirectTimeout = setTimeout(() => {
					//navigation.navigate('Profile');
					navigation.navigate('Requests', { key: itemContent });
				}, 1000);  
			}
			
		}
		setIsLoading(false);
		setValidationError("");
		setIsSubmitting(false);
	};
  
  return (		
	
	<View style={styles.TopRequestcontainer}> 
	
		<View style={styles.edit_request}>
		
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
				placeholder="Add Content"
				value={itemContent}
				onChangeText={text => setContent(text)}
				style={styles.textInput}      
			/>
			
			{isLoading && (
				<ActivityIndicator size="large" color="#68370E" style={styles.activityIndicator} />
			)} 
			
		</View>
		
		
		
		<View style={styles.sameContainer_testi_add}>
			
			{isSubmitting ? (
				<TouchableOpacity activeOpacity={0.7} style={styles.sameContainer1}>
					<Text style={styles.linkSubmit}>Please wait...</Text>				
				</TouchableOpacity> 
				) : (				
				<TouchableOpacity activeOpacity={0.7}  style={styles.sameContainer1} onPress={update_request}>
					<Text style={styles.linkSubmit}>Submit</Text>				
				</TouchableOpacity> 
			)}
		
			<TouchableOpacity style={styles.sameContainer2} onPress={() => navigation.goBack()}>
				<Text style={styles.linkCancel}>Cancel</Text>
			</TouchableOpacity>
		</View>
		
		<BottomMenu navigation={navigation}/>
    </View>

  );
}

export default EditRequest;
