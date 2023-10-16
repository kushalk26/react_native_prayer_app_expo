import React, { useState,useEffect } from 'react'
import { Button } from 'react-native'
import { View, Text,TouchableOpacity,TextInput,Image,ScrollView,ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { FontAwesome } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons'; 
import { SimpleLineIcons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import AsyncStorage from '@react-native-async-storage/async-storage';

import makeApiRequest from '../api';
import { GET_TESTIMONIAL_URL } from '../apiUrls';

import styles from '../../css/styles';
import BottomMenu from '../menu/BottomMenu';

function Testimonial({ navigation }) {
	
	const [data, setData] = useState('');
	let[isLoading,setIsLoading] = useState(false);

	useEffect(() => {     
		fetchData();		
	}, []);
	
	//get all testimonial
	const fetchData = async() => { 
		const sessionData = await AsyncStorage.getItem('sessionData'); 
	
		if (sessionData !== null) {
			setIsLoading(true);
			const parsedSessionData = JSON.parse(sessionData);
			let requestBody = {"user_id":parsedSessionData.user_id,"user_token":parsedSessionData.user_token};	
			const response = await makeApiRequest(GET_TESTIMONIAL_URL, 'POST', requestBody);
			console.log(response.data);
			if(response.data){
				console.log(response.data)
				setData(response.data);
			}
			setIsLoading(false);
		
		}
		
	};
	
	const First100Words = ({ testName }) => {
		var get_data = testName.substring(0, 98) + '....';
		return get_data;
	}
	
	const DateTimeComponent = ({ dateString }) => {
	  // Create a new Date object from the date string
	  const dateObj = new Date(dateString);

	  // Get the date and time components
	  const year = dateObj.getFullYear();
	  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
	  const day = String(dateObj.getDate()).padStart(2, '0');
	  const hours = dateObj.getHours();
	  const minutes = String(dateObj.getMinutes()).padStart(2, '0');

	  // Format the time in 12-hour format
	  const formattedTime = dateObj.toLocaleString('en-US', {
		hour: 'numeric',
		minute: 'numeric',
		hour12: true,
	  });

	  // Combine the date and time components
	  const formattedDateTime = `${day}-${month}-${year} ${formattedTime}`;

	  return <Text>{formattedDateTime}</Text>;
	};
	
	//get single testimonial
	const single_testimonial = async (item_data) => {
		navigation.navigate('TestimonialSingle', { item_data });	
	}
	
   
  return (
   <View style={styles.Topcontainer}>

		<ScrollView contentContainerStyle={styles.container}>

			{ isLoading ? (
				<ActivityIndicator size="large" color="#68370E" style={styles.activityIndicator} />
			) : data.length === 0 ? (
				<View style={styles.container}>
					<Text>No testimonials available.</Text>
					
				</View>
			) : (
			  data.map(item_data => (
				 <View key={item_data.id} style={styles.item_test}>
					<View style={styles.icons_edit_new}>
						{item_data.image ? (
							<Image source={{ uri: item_data.image }} style={styles.upload_image_pd} />
						) : (
							<Image source={require('../../assets/user.png')} style={styles.upload_image_pd} />
						)}
						
						<View style={styles.TextConPrayer}>
							<Text style={styles.postedAuthor}>{item_data.name}</Text>
							<Text style={styles.postedTime}><DateTimeComponent dateString={item_data.created_at} /></Text>
						</View>
						
						<View > 
							<TouchableOpacity onPress={() => single_testimonial(item_data)}>
								<MaterialCommunityIcons name="eye-circle" size={24} color="#39BEA9" />
							</TouchableOpacity>
						</View>
					</View>
					
					<Text style={styles.itemText}><First100Words testName={item_data.testimonial_name} /></Text>
					
				</View>
			))
		)}
			
		  {/* Add more items as needed */}
		</ScrollView>
		
		<Text style={styles.bottomText}></Text>
		<BottomMenu navigation={navigation}/>
    </View>
  );
}

export default Testimonial;
