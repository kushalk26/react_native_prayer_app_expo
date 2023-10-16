import React, { useState, useRef, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Dimensions, Image, Text,TouchableOpacity } from 'react-native';
import makeApiRequest from '../api';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { SPLASH_SCREEN_URL,Splash_screen_url_img } from '../apiUrls';

const { width: screenWidth } = Dimensions.get('window');

const FirstScreen = ({ navigation }) => {
	
  const [currentIndex, setCurrentIndex] = useState(0);
  const[data,setData] = useState('');
  const[total_data,setTotalData] = useState('');
  const[image,setImagePath] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const scrollRef = useRef(null);
  
	useEffect(() => {
		fetchData();
	}, []);
	
	const fetchData = async() => { 
		const sessionData = await AsyncStorage.getItem('sessionData');	
		
		if (sessionData !== null) {
			
			const parsedSessionData = JSON.parse(sessionData);
			
			let requestBody = {"user_id":parsedSessionData.user_id,"user_token":parsedSessionData.user_token};
			await AsyncStorage.removeItem('first_screen');
			
			try {
			  
			   let response = await makeApiRequest(SPLASH_SCREEN_URL, 'POST', requestBody);
			
			   //get splash data
				if(response.data){
				    let res_data = response.data;					
				    setData(res_data);
				}
				//get splash image
				if(response.data){
				    let res_image = response.image;	
					console.log(res_image);
					console.log(res_image);
				    setImagePath(res_image);
				}
				//check total count of items   
				if(response.count){
					setTotalData(response.count);
				}
				
			  setIsLoading(false);  
			} catch (error) {
			  console.error('Error fetching data:', error);
			} finally {
			  
			}
			
		}
	};

  const handleScroll = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / screenWidth);
    setCurrentIndex(index);
  };

  const scrollToIndex = (index) => { 
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        x: index * screenWidth,
        animated: true,
      });
    }
  };

  return (
    <View style={styles.Topcontainer}>	
		
		<Image source={require('../../assets/logo-church_large.png')} style={{ width: 50, height: 50,borderRadius: 5, marginTop:20, marginBottom:20 }} />
		
		

	  {total_data > 0 ? (
		<View>
			<View style={styles.requestContainer}>
			
			  <ScrollView
				ref={scrollRef}
				horizontal
				pagingEnabled
				showsHorizontalScrollIndicator={false}
				onScroll={handleScroll}
				scrollEventThrottle={16}
			  >
				{/* Content slides */}
				
				{data.map((item, index) => (
				
				<View key={index} style={[styles.slide, styles.slide1]}>
					{item.screen_saver_image ? (<Image source={{uri: `${Splash_screen_url_img}${item.screen_saver_image}`}} style={{ width: 300, height: 200,borderRadius: 25, marginTop:20 }} /> ) : (<Image source={require('../../assets/church.png')} style={{ width: 300, height: 200,borderRadius: 25, marginTop:20 }} /> )}
					<Text style={styles.churchTitle}>Pray for Health</Text>
					<Text style={styles.churchText}>{item.field_text}</Text>
				</View>
				
				
				))}
				
			</ScrollView>
			  
			</View> 
			
			{total_data > 0 ? (
				<View style={styles.dotsContainer}>
					{/* Dots */}
					
					{data.map((item, index) => (
						<View key={index}
						  style={[
							styles.dot,
							currentIndex === index && styles.activeDot,
						  ]}
						/>
					))}
					
				</View>
			):(null)}
		</View>
		  
	   ) : (
		<Text>No data available.</Text>
	  )}
		
		
	<TouchableOpacity onPress={() => navigation.navigate('ProfileScreen')} style={styles.skip}>
		<Text style={styles.skipText}>Skip</Text>
	</TouchableOpacity>
    </View>
  );
};

export default FirstScreen;

const styles = StyleSheet.create({
	Topcontainer: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	church_logo:{
		marginTop:20,
		marginBottom:20,
	},
	requestContainer:{
		width: '100%',
		borderRadius: 30,
		alignItems: 'center',
		
	},
	slide: {
		width: screenWidth,
		justifyContent: 'center',
		alignItems: 'center',
	},
	dotsContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 8,
	},
	dot: {
		width: 10,
		height: 10,
		borderRadius: 5,
		marginHorizontal: 4,
		backgroundColor: '#999',
	},
	activeDot: {
		backgroundColor: '#68370E',
	},
	churchTitle:{
		color:'#68370E',
		fontWeight:'bold',
		marginBottom:10,
		paddingLeft:20,
		paddingRight:20,
		paddingTop:20,
	},
	churchText:{
		marginBottom:20,
		marginTop:10,
		paddingLeft:20,
		paddingRight:20,
		paddingBottom:20,
	},
	churchHeading:{
		fontWeight:'bold',
		marginBottom:10,
		fontSize:20,
		paddingLeft:20,
		paddingRight:20
		
	},
	church_banner:{
		borderRadius: 25,
	},
	skip:{
		marginTop:10,
		backgroundColor: '#68370E',
		paddingLeft: 35,
		paddingRight: 35,
		paddingTop: 10,
		paddingBottom: 10,
		borderRadius: 25,
		alignItems: 'center'
	},
	skipText:{
		color:'#fff'
	},
});