import React, { useState,useEffect } from 'react';
import { View, Text, TextInput, Button,Image,TouchableOpacity,ScrollView,ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from '../css/styles';
import BottomMenu from './menu/BottomMenu';
import makeApiRequest from './api';
import { GET_NOTIFICATION_URL } from './apiUrls';

function NotificationScreen({ navigation }) {
	
	const [data, setData] = useState('');
	const [total, setTotal] = useState('');
	const [page, setPage] = useState(1);
	let[isLoading,setIsLoading] = useState(false);
	
	useEffect(() => {   
		console.log('kakakakak');
		fetchData();		
	}, [page]);
	
	const fetchData = async() => { 
		
		const sessionData = await AsyncStorage.getItem('sessionData');
		if (sessionData !== null) {
			setIsLoading(true);
			var noturl = GET_NOTIFICATION_URL+'?page='+page;
			console.log(noturl);
			const parsedSessionData = JSON.parse(sessionData);
			let requestBody = {"user_id":parsedSessionData.user_id,"user_token":parsedSessionData.user_token};	
			const response = await makeApiRequest(noturl, 'POST', requestBody);
			if(response.data){								
				let res_data = response.data;
				console.log(res_data);
				setData((prevData) => [...prevData, ...res_data]);
				setTotal(response.total);
			}
			 
			setIsLoading(false);
			
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
	
	const handleScroll = ({ layoutMeasurement, contentOffset, contentSize }) => {
		const isCloseToBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;
		if (isCloseToBottom && !isLoading) {
			if(total>page){
				setPage(page+1);			
			}
		  
		}
		//console.log('scroll');
	};
	
	const handlePress = ({ item }) => {
		//single notification
	};
   
  return (
		<View style={styles.notiicationContainerTop}>
			<ScrollView style={styles.notiicationScroll} onScroll={({ nativeEvent }) => handleScroll(nativeEvent)}>
			
				{data.length === 0 ? (
					<View style={styles.container}>
						<Text>No data available.dc</Text>
						{isLoading && (
							<ActivityIndicator size="large" color="#68370E" style={styles.activityIndicator} />
						)} 
					</View>
				) : (
					data.map(item_data => (
						<View key={item_data.id} style={styles.notification}>
							<TouchableOpacity onPress={() => handlePress(item_data)}>
								<View style={styles.notificatonStyle}>
									<Text style={styles.notificationText}>{item_data.notification_name}</Text>
								</View>
								<View style={styles.notificatonStyle}>
									<Text style={styles.notificationText}><DateTimeComponent dateString={item_data.created_at} /></Text>
								</View>
							</TouchableOpacity>
						</View>
					))
				)}
			</ScrollView>
			
			<BottomMenu navigation={navigation}/>
		</View>
		
		
  );
}

export default NotificationScreen;
