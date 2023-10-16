import React, { useState,useEffect  } from 'react'
import { Button } from 'react-native'
import { View,Image, ScrollView,Text,TouchableOpacity,TextInput,ActivityIndicator,Alert  } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import makeApiRequest from '../api';
import { REQUEST_DATA_URL,DELETE_REQUEST_URL,GET_TOTAL_LIKEHEART_URL } from '../apiUrls';
import { useRoute } from '@react-navigation/native';

import styles from '../../css/styles';
import BottomMenu from '../menu/BottomMenu';

function RequestData({ navigation }) {
	const[data,setData] = useState('');
	const[reload,setReload] = useState('');
	const[like,setLike] = useState(0);
	const[heart,setHeart] = useState(0);
	const[image,setImage] = useState('');
	let[isLoading,setIsLoading] = useState(false);
	let[isLoadingC,setIsLoadingC] = useState(true);
	const [page, setPage] = useState(1);
	const [total, setTotal] = useState('');
	let [setkey, setSetKey] = useState(1);
	
	const route = useRoute();
	let { key } = route.params || {};
	
	
	useEffect(() => {
		fetchData();
	}, [reload,page,key]);
	
	//get request data
	const fetchData = async() => { 
		const sessionData = await AsyncStorage.getItem('sessionData');
		await AsyncStorage.removeItem('random_number');
		//create api request to get user data
		setIsLoading(true);
		
		if(key!=undefined){
			console.log(key);
			if(key!=setkey){				
				setSetKey(key);
				setData(''); 			
				setPage(1);
			}
		}
		
		if (sessionData !== null) {
			const parsedSessionData = JSON.parse(sessionData);			
			const profile_picture = await AsyncStorage.getItem('profile_picture');   
			
			if (profile_picture !== null) {
				setImage(profile_picture);
			}
			
			let requestBody = {"user_id":parsedSessionData.user_id,"user_token":parsedSessionData.user_token};	
			
			//get total like and heart
			const second_api_res = await makeApiRequest(GET_TOTAL_LIKEHEART_URL, 'POST', requestBody);
			if(second_api_res.heart){				
				setHeart(second_api_res.heart);
			}
			if(second_api_res.like){
				setLike(second_api_res.like);
			}
			setIsLoadingC(false);
			
			//get current request data
			var my_data_request = REQUEST_DATA_URL+'?page='+page;
			const response = await makeApiRequest(my_data_request, 'POST', requestBody);
			
			if(response.data){								
				let res_data = response.data;
				setData((prevData) => [...prevData, ...res_data]);
				setTotal(response.total);
			}
		
			setIsLoading(false);
	
		} else {
			setIsLoading(false);
			setIsLoadingC(false);
		} 
	};
	
	//delete api request
	
	const deleteData = async(item) => { 
		const sessionData = await AsyncStorage.getItem('sessionData');
		setIsLoadingC(true);
		if (sessionData !== null) {
			const parsedSessionData = JSON.parse(sessionData);
			
			let requestBody = {"user_id":parsedSessionData.user_id,"user_token":parsedSessionData.user_token,'request_id':item.id};	
			const response = await makeApiRequest(DELETE_REQUEST_URL, 'POST', requestBody);
			console.log(response);
			if(response.message){	
				setData(''); 
				setReload(item.id);
				setPage(1);
			}
			//setIsLoading(false);
			//navigation.navigate('Profile');
			
		}
		setIsLoadingC(false);
		//setIsLoading(false);
		
	}
	
	const handleDeleteItem = (item) => {	
		deleteData(item);
	};

	//delete request
	const handleDeletePress = (item) => {
		setIsLoading(true);
		Alert.alert(
		  'Confirmation',
		  'Are you sure you want to delete?',
		  [
			{ text: 'Cancel', style: 'cancel' },
			{ text: 'Delete', style: 'destructive', onPress: () => handleDeleteItem(item) },
		  ],
		  { cancelable: false }
		);
	};
	//view request
	const handleItemPress = (item) => {	
		navigation.navigate('ViewRequest', { item });
	};
	//edit request
	const handleEditPress = async (item_data) => {
		console.log(item_data);
		navigation.navigate('EditRequest', { item_data });		
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
	
	const handleItemPressSurvey = (item) => {
		navigation.navigate('Survey2');
	};
	
	const handleScroll = ({ layoutMeasurement, contentOffset, contentSize }) => {
		const isCloseToBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;
		if (isCloseToBottom && !isLoading) {
			if(total>page){
				setPage(page+1);			
			}
		  
		}
	};
	
  
  return (		
	
	<View style={styles.Topcontainer}>
		{!isLoadingC ? (
			<View style={styles.samen2ContainerText}>
				<View style={styles.TextCon}>
					<Text style={styles.textReq}>You have got <FontAwesome name="thumbs-up" size={20} color="#39BEA9" /> {like}</Text>
					
					<Text style={styles.textReq}>You have got <FontAwesome name="heart" size={20} color="red" /> {heart}</Text>
				</View>
				<View style={styles.samenRequestContainer}>
					<TouchableOpacity onPress={() => handleItemPressSurvey()}> 
						<Text style={styles.linkSubmit}>Create Request</Text> 
					</TouchableOpacity>
				</View>
				
			</View>
		) : (null)}
		
		
		
		<View><Text style={styles.title_request}>My Requests</Text></View>	
		<ScrollView contentContainerStyle={styles.container} onScroll={({ nativeEvent }) => handleScroll(nativeEvent)}>
		
			{isLoading ? (
				<ActivityIndicator size="large" color="green" style={styles.activityIndicator} />
			) : data.length === 0 ? (
				
				<View style={styles.samen2ContainerColumn}>
					<Text style={{ marginBottom: 30 }}>No Requests available.</Text>
					
				 
					<View style={styles.samenRequestContainer}>
						<TouchableOpacity onPress={() => handleItemPressSurvey()}> 
							<Text style={styles.linkSubmit}>Create Request</Text> 
						</TouchableOpacity>
					</View>
						
				</View>
			
			) : (
			  data.map(item => (
			  
			<View key={item.id} style={styles.item}>
				
				<View style={styles.icons_edit}>
					
					
					{image ? (
						<Image source={{ uri: image }} style={styles.logo_image} />    
					  ) : (
						<Image source={require('../../assets/user.png')} style={styles.upload_image_pd} />
					  )}
					
					<View style={styles.TextCon}>
						<Text style={styles.postedAuthor}>{item.name}</Text>
						<Text style={styles.postedTime}>
							<DateTimeComponent dateString={item.created_at} />
						</Text>
						
					</View>
				</View>
				
				<Text style={styles.itemText}><First100Words testName={item.content} /></Text>
		  
				<View style={styles.samen2ContainerText}>
					<View style={styles.TextCon}>
						<Text style={styles.textReq}>Prayers: {item.count}</Text>
					</View>
					
					<View style={styles.icons_edit}>
						<TouchableOpacity onPress={() => handleItemPress(item)}>
							<FontAwesome style={styles.icons} name="eye" size={20} color="#39BEA9" />
						</TouchableOpacity>
						<TouchableOpacity onPress={() => handleEditPress(item)}>
							<FontAwesome style={styles.icons} name="edit" size={20} color="#68370E" />
						</TouchableOpacity>
						<TouchableOpacity onPress={() => handleDeletePress(item)}>
							<FontAwesome style={styles.icons} name="trash" size={20} color="red" />
						</TouchableOpacity>
					</View>
					
				</View>				
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

export default RequestData;
