import React, { useState,useEffect } from 'react'
import { Button } from 'react-native'
import { View, Text,TouchableOpacity,TextInput,Image,ScrollView,ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons'; 
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import makeApiRequest from '../api';
import { GET_COMMENT_URL,CREATE_LIKEHEART_URL } from '../apiUrls';

import styles from '../../css/styles';
import BottomMenu from '../menu/BottomMenu';

function ViewRequest({ navigation }) {
  const [text, setText] = useState('');
  let[isLoading,setIsLoading] = useState(true);
  const handleTextChange = (inputText) => {
    setText(inputText);
  };
	const route = useRoute();
	const [reloadKey, setReloadKey] = useState(1);
	const { item } = route.params;
	const [itemId, setItemId] = useState(item.id); 
    const[data,setData] = useState('');
	const [page, setPage] = useState(1);
	const [total, setTotal] = useState('');
	useEffect(() => {
		fetchData();
	}, [page]);
	
	
	// get prayer comment data of users
	
	const fetchData = async () => {
		
		const sessionData = await AsyncStorage.getItem('sessionData');

			console.log('fffitem');
			console.log(item);
		
		if (sessionData !== null) {
			const parsedSessionData = JSON.parse(sessionData);
			let requestBody = {"user_id":parsedSessionData.user_id,"user_token":parsedSessionData.user_token,"request_id":itemId};
			
			try {
			   var my_data_request = GET_COMMENT_URL+'?page='+page;
			   let response = await makeApiRequest(my_data_request, 'POST', requestBody);
			 
				if(response.data){		
					setIsLoading(true)
					let res_data = response.data;
					setData((prevData) => [...prevData, ...res_data]);
					setTotal(response.total);
					
				}
				
			   setIsLoading(false);
			   
			   setIsLoading(false); 
			} catch (error) {
			  console.error('Error fetching data:', error);
			  console.error('Error fetching data:', error);
			} finally {
			  setIsLoading(false);
			}
			
			
		}
	};
	
	//view first 100 words
	
	const First100Words = ({ testName }) => {
		var get_data = testName.substring(0, 50) + '..';
		return get_data;
	}
	
	const handleScroll = ({ layoutMeasurement, contentOffset, contentSize }) => {
		const isCloseToBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;
		if (isCloseToBottom && !isLoading) {
			if(total>page){
				setPage(page+1);			
			}
		}
		
	};
	
	const handleItemPress = async (item_data) => {
		navigation.navigate('AddTestimonial', { item_data });
	};
	
	const edit_request = async (item_data) => {
		navigation.navigate('EditRequest', { item_data });		
	};
	
	//like press
	
	const handleLikePress = async(item) => {
		if(item.like_req==1){
			item.like_req=0;
		} else{
			item.like_req=1;
		}
		
		const sessionData = await AsyncStorage.getItem('sessionData');		
		//create api request to get user data
		//if(pagevalue!=0){
			if (sessionData !== null) {
				console.log(item);
				console.log('handle like pressvvvvv');
				const parsedSessionData = JSON.parse(sessionData);
				let requestBody = {"user_id":parsedSessionData.user_id,'request_id':item.request_id,"user_token":parsedSessionData.user_token,'like':1,"comment_user_id":item.comment_user_id,'comment_author_name':item.name,'comment_id':item.id};
				
				try {
				   				   
				   let response = await makeApiRequest(CREATE_LIKEHEART_URL, 'POST', requestBody);
				   console.log(response)
				   console.log('response')
				   if(response.message){
						
					    var loditem = item.id;
						console.log("load item");
						setReloadKey(reloadKey + 1);
						
				   }
				   setIsLoading(false);
				} catch (error) {
				  console.error('Error fetching data:', error);
				} finally {
				  setIsLoading(false);
				}
			}
				   
	};
	
	//view comment
	
	
	
	const handleViewComment = async(item_data) => {
		console.log('view comment');
		navigation.navigate('ViewPrayerComment', { item_data });
	}
	
	//heart press
	
	const handleHeartPress = async(item) => {
		console.log('manage like888');
		if(item.heart==1){
			item.heart=0;
		} else{
			item.heart=1;
		}
		
		console.log(item.heart);
		const sessionData = await AsyncStorage.getItem('sessionData');		
		
		//create api request to get user data
		//if(pagevalue!=0){
			if (sessionData !== null) {
				const parsedSessionData = JSON.parse(sessionData);
				let requestBody = {"user_id":parsedSessionData.user_id,'request_id':item.request_id,"user_token":parsedSessionData.user_token,'heart':1,"comment_user_id":item.comment_user_id,'comment_author_name':item.name,'comment_id':item.id};
				
				try {	   
				   let response = await makeApiRequest(CREATE_LIKEHEART_URL, 'POST', requestBody);
				   if(response.message){ 
						var loditem = item.id;						
						setReloadKey(reloadKey + 1);
						
				   }
				   setIsLoading(false);
				} catch (error) {
				  console.error('Error fetching data:', error); 
				} finally {
				  setIsLoading(false);
				}
			}
				  
	};
	
  
  return (		 
	
	<View style={styles.TopRequestcontainer}> 
		
		<ScrollView contentContainerStyle={styles.container_scroll_req} onScroll={({ nativeEvent }) => handleScroll(nativeEvent)}>
		<View style={styles.item}>
			
			<View style={styles.icons_edit}>
				
				{item.image ? (
					<View style={styles.centerContent}>
						<Image source={{ uri: item.image }} style={styles.upload_image_pd} />
					</View>
				) : (
					<Image source={require('../../assets/user.png')} style={styles.upload_image_pd} />
				)}		
				
				<View style={styles.TextCon}>
					<Text style={styles.postedAuthor}>{item.name}</Text>
					<Text style={styles.postedTime}>{item.created_at}</Text>
				</View>
			</View>
			<Text style={styles.itemText}>{item.content}</Text>
		  
			<View style={styles.samen2ContainerText}>
				<View style={styles.icons_edit}>
					<TouchableOpacity onPress={() => edit_request(item)}>
						<FontAwesome style={styles.icons} name="edit" size={20} color="#68370E" />
					</TouchableOpacity>
					<FontAwesome style={styles.icons} name="trash" size={20} color="red" />
				</View>
			</View>
		</View>
		
		
	
			
			<Text style={styles.title_view_request}>Prayer Users</Text>	
			
			<View style={styles.sameContainer_testi}>
				
				{data.length === 0 ? (
			  
					<View>
						<Text>No data available.</Text>
						{isLoading && (
							<ActivityIndicator size="large" color="#68370E" style={styles.activityIndicator} />
						)} 
					</View>
			
			) : (
			  data.map(item_data => (

				<View key={item_data.id} style={styles.sameContainer_prayer}>
					
					{item_data.image ? (
						<Image source={{ uri: item_data.image }} style={styles.upload_image_pd} />
					  ) : (
						<Image source={require('../../assets/user.png')} style={styles.upload_image_pd} />
					)}
					
					<Text style={styles.commentAuthor}>{item_data.name}</Text>
					
					<TouchableOpacity onPress={() => handleViewComment(item_data)}>
						<Text style={styles.prayer_text}><First100Words testName={item_data.comment} /></Text>
					</TouchableOpacity>
					
					
					
					<View style={styles.sameContainer_testi}>
					
						<TouchableOpacity onPress={() => handleLikePress(item_data)}>
							<FontAwesome style={styles.icon_request} name="thumbs-up" size={15} color={item_data.like_req===1 ? '#39BEA9' : 'black' } />
						</TouchableOpacity>
						
						<TouchableOpacity onPress={() => handleHeartPress(item_data)}>
							<FontAwesome style={styles.icon_request} name="heart" size={15} color={item_data.heart===1 ? 'red' : 'black' } />
						</TouchableOpacity>
						
						<TouchableOpacity onPress={() => handleItemPress(item_data)}>
							<FontAwesome style={styles.icon_request} name="quote-right" size={13} color='black' />
						</TouchableOpacity>
						
						
					</View>
										
				</View>
			
		  ))
			)}
			
			</View>
		</ScrollView>
		<Text style={styles.bottomText}></Text>
		<BottomMenu navigation={navigation}/>
    </View>

  );
}

export default ViewRequest;
