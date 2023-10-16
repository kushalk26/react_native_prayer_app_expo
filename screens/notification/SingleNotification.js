import React, { useState,useEffect } from 'react';
import { View, Text, TextInput, Button,Image,TouchableOpacity,ScrollView,ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';

import styles from '../../css/styles';
import BottomMenu from '../menu/BottomMenu';
import makeApiRequest from '../api';
import { GET_NOTIFICATION_SINGLE_URL } from '../apiUrls';

function SingleNotification({ navigation }) {
	const [data, setData] = useState('');
	const route = useRoute();
	const { item } = route.params;
	
	let[isLoading,setIsLoading] = useState(false);
	
	useEffect(() => {  
		fetchData();		
	}, []);
	
	const fetchData = async() => { 
		
		const sessionData = await AsyncStorage.getItem('sessionData');
		//GET_NOTIFICATION_SINGLE_URL
		if (sessionData !== null) {
			setIsLoading(true);
			
			const parsedSessionData = JSON.parse(sessionData);
			let requestBody = {"user_id":parsedSessionData.user_id,"user_token":parsedSessionData.user_token,'notification_id':item.id};	
			const response = await makeApiRequest(GET_NOTIFICATION_SINGLE_URL, 'POST', requestBody);
			console.log(response); 
			if(response.data){								
				let res_data = response.data;			
				setData(res_data);
			}
			 
			setIsLoading(false);
			
			//console.log(data);  
		}
		 
	};
	
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
	
	
	const handlePress = async({ item }) => {
		//single notification
	};
   
  return (
		<View style={styles.notiicationContainerTop}>
			<ScrollView style={styles.notiicationScroll}>
			
				{data.length === 0 ? (
					<View style={styles.container}>
						<Text>No data available.</Text>
						{isLoading && (
							<ActivityIndicator size="large" color="#68370E" style={styles.activityIndicator} />
						)} 
					</View>
				) : (
					
						<View >
							<View style={styles.icons_edit}>
								{data.image ? (
									<Image source={{ uri: data.image }} style={styles.upload_image_pd} />
									
								) : (
									<Image source={require('../../assets/user.png')} style={styles.upload_image_pd} />
								)}
								
								<View style={styles.TextCon}>
									<Text style={styles.postedAuthor}>{data.name}</Text>
									<Text style={styles.postedTime}><DateTimeComponent dateString={data.created_at} /></Text>
									
								</View>
								
							</View>
							
							<Text style={styles.itemText}>{data.notification_name}</Text>
							<Text style={styles.itemText}></Text>
							
						</View>
					
				)}
			
			</ScrollView>
			
			<BottomMenu navigation={navigation}/>
		</View>
		
		
  );
}

export default SingleNotification;
