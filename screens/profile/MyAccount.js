import React, { useState,useEffect } from 'react'
import { Button } from 'react-native'
import { View, Text,TouchableOpacity,TextInput,Image,ScrollView,Picker,ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';

import { FontAwesome } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons'; 
import { SimpleLineIcons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons';
import { RadioButton } from 'react-native-paper';

import styles from '../../css/styles';
import BottomMenu from '../menu/BottomMenu';
import makeApiRequest from '../api';
import { MY_ACCOUNT_URL,UPDATE_USER_URL,IMAGE_UPLOAD_URL,Image_URL } from '../apiUrls';

function MyAccount({ navigation }) {
	const [email, setEmail] = useState('');
	const [name, setName] = useState('');
	const [phone, setPhone] = useState('');
	const [dob, setdob] = useState('');
	const [checked, setState] = useState('');
	const [success, setSuccess] = useState('');
	let[isLoading,setIsLoading] = useState(true);
	
	const [image, setImage] = useState(null);
	
	  const handleOptionSelect = (option) => {
		setSelectedOption(option);
	  };
	  
	// upload user profile image
	const handleImageUpload = async() => {
		setIsLoading(true);
		setSuccess('');
		 let result = await ImagePicker.launchImageLibraryAsync({
			allowsEditing: false, // higher res on iOS
			aspect: [4, 3],
		  });

		const sessionData = await AsyncStorage.getItem('sessionData');
		let user_id = '';
		//create api request to get user data
		if (sessionData !== null) {
			const parsedSessionData = JSON.parse(sessionData);
			user_id = parsedSessionData.user_id;
			let requestBody = {"user_id":parsedSessionData.user_id,"user_token":parsedSessionData.user_token};
			
		}
		  if(result.assets[0].uri){
			let localUri = result.assets[0].uri;
			let filename = localUri.split('/').pop();
			setImage(localUri);
			let match = /\.(\w+)$/.exec(filename);	
			let type = match ? `image/${match[1]}` : `image`;
			console.log(type);	
			

		  //let match = /\.(\w+)$/.exec(filename);
		  //let type = match ? `image/${match[1]}` : `image`;

		 
		  var data = new FormData();  
			data.append('image', {  
			  uri: localUri,
			  name: filename,
			  type: 'image/jpg'
			});
			data.append('user_id',user_id);
			
			const response = await fetch(IMAGE_UPLOAD_URL, {  
			  headers: {
				'Accept': 'application/json',
				'Content-Type': 'multipart/form-data'
			  },
			  method: 'POST',
			  body: data
			});
			const responseData = await response.json();
			console.log('cccccc');
			console.log(responseData);
			
			if (!response.ok) {    
			  throw new Error(responseData.error || 'An error occurred.');
			}
			if(responseData.message){
				setSuccess(responseData.message);
				AsyncStorage.removeItem('profile_picture');
				AsyncStorage.setItem('profile_picture', responseData.image_path);
			}
			setIsLoading(false); 
		
		  }
			
	};
	  
	useEffect(() => {     
		fetchData();		
	}, []);
	//get data while loading
	const fetchData = async() => { 
		var profile_img_n = await AsyncStorage.getItem('profile_picture');  
		if (profile_img_n !== null) {
			console.log(profile_img_n);  
			console.log('profile_img_n');
			//setImage(profile_img_n);
		}
		//get data from session
		setIsLoading(true);
		const sessionData = await AsyncStorage.getItem('sessionData'); 
		
		//create api request to get user data
		if (sessionData !== null) {
			const parsedSessionData = JSON.parse(sessionData);
			let requestBody = {"user_id":parsedSessionData.user_id,"user_token":parsedSessionData.user_token};	
			const response = await makeApiRequest(MY_ACCOUNT_URL, 'POST', requestBody);
			console.log(response)
			setIsLoading(false);
			if(response.email){			
				setEmail(response.email);
			}
			if(response.name){
				setName(response.name);
			}
			if(response.gender){
				setState(response.gender);
			}
			if(response.dob){
				setdob(response.dob);
			}
			if(response.phone_no){
				setPhone(response.phone_no);
			}
			//if(response.phone_no){
			if(response.image){
				setImage(response.image);
			}
			//}
			
		}
		
	};
	
	//update profile
	
	const handleUpdate = async() => {
		//get data from session
		const sessionData = await AsyncStorage.getItem('sessionData');

		if (sessionData !== null) {
			const parsedSessionData = JSON.parse(sessionData);
			let user_id = parsedSessionData.user_id;
			let token = parsedSessionData.user_token;
			console.log("before");
			console.log(name);
			let requestBody = {"user_id":user_id,"user_token":token,"name":name,"phone_no":phone,"gender":checked,"dob":dob};
			
			const response = await makeApiRequest(UPDATE_USER_URL, 'POST', requestBody);
			
		}
		
	};

	const handleSecond = async() => {
		setState('Female');
	};
	const handleThird = async() => {
		setState('third');
	};
	const handleFirst = async() => {
		setState('Male');
	};
	
	
   
  return (
    <View style={styles.TopAccountcontainer}>
		{/* Account fields */}
			<View style={styles.paddingContainer}>
			<ScrollView>
			
				{success ? (
					<View style={styles.successContainer}>
					  <Text style={styles.successText}>{success}</Text>
					</View> 	
				) : null} 
			
					<View style={styles.container}>
					  {image ? (
						<Image source={{ uri: image }} style={styles.upload_image} />
					  ) : (
						<Text style={styles.placeholderText}>Select Profile Image</Text>
					  )}

					  <TouchableOpacity style={styles.uploadimg_button} onPress={handleImageUpload}>
						<Text style={styles.buttonText_img}>Upload Image</Text>
					  </TouchableOpacity>
					</View>
				
					{isLoading && (
						<ActivityIndicator size="large" color="#68370E" style={styles.activityIndicator} />
					)} 
				
				<Text style={styles.accountTitle}>Name</Text>
				<TextInput style={styles.input} onChangeText={setName} value={name} placeholder="Name" />
				
				<Text style={styles.accountTitle}>Email</Text>
				<TextInput style={styles.input} onChangeText={setEmail} value={email} placeholder="Email" />
				
				<Text style={styles.accountTitle}>Phone Number</Text>
				
				<TextInput style={styles.input} onChangeText={setPhone} keyboardType="numeric" value={phone} placeholder="Phone Number"  />
				
				<Text style={styles.accountTitle}>Gender</Text>
				
				<View style={styles.radiostyle}>
					<RadioButton
					  value="Male"
					  label="Male"
					  status={checked === 'Male' ? 'checked' : 'unchecked'}
					  onPress={handleFirst}
					  onChangeText={setState}
					/> 
					<Text style={styles.simple}>Male</Text>
			
					<RadioButton
					  value="Female"
					  status={checked === 'Female' ? 'checked' : 'unchecked'}
					  onPress={handleSecond}
					  onChangeText={setState}
					/>
					<Text style={styles.simple2}>Female</Text>
					
				 </View>
				
				<Text style={styles.accountTitle}>DOB</Text>
				<TextInput style={styles.input} onChangeText={setdob} value={dob} placeholder="12/04/1989"  />
				
				
				<TouchableOpacity style={styles.login} onPress={handleUpdate}>
					<Text style={styles.loginText}>Update Profile</Text> 
				</TouchableOpacity>  
				</ScrollView>
				
			</View>
			
		<BottomMenu navigation={navigation}/>
    </View>

  );
}

export default MyAccount;
