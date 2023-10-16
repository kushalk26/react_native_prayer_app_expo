import React, { useState,useEffect } from 'react'
import { Button } from 'react-native'
import { View, Text,TouchableOpacity,TextInput,Image,ScrollView,ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons'; 
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import makeApiRequest from '../api';
import { CREATE_TESTIMONIAL_URL } from '../apiUrls';

import styles from '../../css/styles';
import BottomMenu from '../menu/BottomMenu';

function AddTestimonial({ navigation }) {
  const [text, setText] = useState('');
  let[isLoading,setIsLoading] = useState(false);
  const handleTextChange = (inputText) => {
    setText(inputText);
  };
	let[testimonial,setTestimonial] = useState('');
	const route = useRoute();
	const { item_data } = route.params;
	const [itemId, setItemId] = useState(item_data.comment_user_id); 
    const [data,setData] = useState('');
	
	const [validationError, setValidationError] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [success, setSuccess] = useState('');
	
	useEffect(() => {
		fetchData();
	}, []);
	
	const create_testimonial = async () => {
		
		if (!testimonial) {
		  setValidationError('Please enter testimonial');
		  return;
		}	 
		
		console.log("kus");
		
		setValidationError('');
		setIsSubmitting(true);
		setSuccess("");
		setIsLoading(true);
		setIsSubmitting(true);
		
		const sessionData = await AsyncStorage.getItem('sessionData'); 		
		
		if (sessionData !== null) {
			
			const parsedSessionData = JSON.parse(sessionData);
			
			let requestBody = {"user_id":parsedSessionData.user_id,"user_token":parsedSessionData.user_token,"comment_user_id":itemId,"testimonial":testimonial};
			
			let response = await makeApiRequest(CREATE_TESTIMONIAL_URL, 'POST', requestBody);
			
			console.log(response);
			setIsLoading(false);
			if(response.message){
				setIsSubmitting(false);
				
				setValidationError("");
				setTestimonial("");
				setSuccess("Testimonial created successfully");
				const redirectTimeout = setTimeout(() => {
					//navigation.navigate('Requests');
					navigation.goBack(); 
				}, 800);
				
			}
			
		}
		setIsLoading(false);
		setValidationError("");
		setIsSubmitting(false);
	};
	
	
	// get prayer comment data of users
	
	const fetchData = async (page_n) => {
		
		const sessionData = await AsyncStorage.getItem('sessionData');		
		
		if (sessionData !== null) {
			
			const parsedSessionData = JSON.parse(sessionData);
			let requestBody = {"user_id":parsedSessionData.user_id,"user_token":parsedSessionData.user_token,"comment_user_id":itemId};
			
		}
	};
	
	
  
  return (		
	
	<View style={styles.TopRequestcontainer}> 
	
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
	
		<View style={styles.edit_request}>
			<View style={styles.test_data}>
				{item_data.image ? (
					<Image source={{ uri: item_data.image }} style={styles.upload_image_testimo} />
				  ) : (
					<Image source={require('../../assets/user.png')} style={styles.upload_image_testimo} />
				)}
				<Text style={styles.testName}>{item_data.name}</Text>
			</View>
			<TextInput
				multiline
				numberOfLines={4}
				placeholder="Add Testimonial*"				 
				onChangeText={text => setTestimonial(text)}
				value={testimonial}
				style={styles.textInput}     
			/> 
		</View>
		
		{isLoading && (
			<ActivityIndicator size="large" color="#68370E" style={styles.activityIndicator} />
		)} 
		
		<View style={styles.sameContainer_testi_add}>
		
			
			{isSubmitting ? (
				<TouchableOpacity activeOpacity={0.7} style={styles.sameContainer1}>
					<Text style={styles.linkSubmit}>Please wait...</Text>				
				</TouchableOpacity> 
				) : (				
				<TouchableOpacity activeOpacity={0.7} style={styles.sameContainer1} onPress={create_testimonial}>
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

export default AddTestimonial;
