import React, { useState } from 'react'
import { Button } from 'react-native'
import { View, Text,TouchableOpacity,TextInput,Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import makeApiRequest from '../api';
import { CREATE_COMMENT_URL } from '../apiUrls';
import styles from '../../css/styles';
import BottomMenu from '../menu/BottomMenu';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { useRoute } from '@react-navigation/native';


function CreatePrayer({ navigation }) { 
	let[comment,setComment] = useState('');
	
	const route = useRoute();
	const { item } = route.params;
	
	const [itemId, setItemId] = useState(item.id);
	
	let[isLoading,setIsLoading] = useState(false);
	const [validationError, setValidationError] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [success, setSuccess] = useState('');
	
	
	const create_prayer_request = async () => {
		
		if (!comment) {
		  setValidationError('Please enter prayer comment');
		  return;
		}	
		
		setValidationError('');
		setIsSubmitting(true);
		setSuccess("");
		
		const sessionData = await AsyncStorage.getItem('sessionData');		
		
		if (sessionData !== null) {
			
			const parsedSessionData = JSON.parse(sessionData);
			
			let requestBody = {"user_id":parsedSessionData.user_id,"user_token":parsedSessionData.user_token,"request_id":itemId,"comment":comment};
			
			let response = await makeApiRequest(CREATE_COMMENT_URL, 'POST', requestBody);
			setIsSubmitting(false);
			setComment('');
			if(response.message){
				setSuccess("Request created successfully.");
				const redirectTimeout = setTimeout(() => {
					//navigation.navigate('Requests');
					navigation.navigate('Prayer'); 
				}, 800);
				setValidationError("");
			}
			
		}
	}
   
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
	
		{item.image ? (
			<View style={styles.centerContent}>
				<Image source={{ uri: item.image }} style={styles.upload_image_pd_new} />
			</View>
		) : (
			<Image source={require('../../assets/user.png')} style={styles.upload_image_pd_new} />
		)}		
		
		<Text style={styles.createPrayerText}>{item.content} </Text>

		 
		<TextInput
        multiline
        numberOfLines={4}
        placeholder="Add your prayer here"
        onChangeText={text => setComment(text)}
		value={comment}
		style={styles.textInput}         
		/>

		
		{isSubmitting ? (
			<View style={[styles.samen1Container, styles.disabledButton]}>
			  <Text style={styles.linkSubmit}>Submit</Text>
			</View>
			) : (
			
			<TouchableOpacity activeOpacity={0.7} style={styles.samen1Container} onPress={create_prayer_request}>
				<Text style={styles.linkSubmit}>Submit</Text>
				{isSubmitting && <Text style={styles.submittingText}>Submitting...</Text>}
			</TouchableOpacity>
			
		)}
		
		<View style={styles.samen2Container}>
			<TouchableOpacity onPress={() => navigation.goBack()}>
				<Text style={styles.linkCancel}>Cancel</Text>
			</TouchableOpacity>
		</View>
		
		<BottomMenu navigation={navigation}/>
    </View>

  );
}

export default CreatePrayer;
