import React, { useState, useEffect } from 'react';
import { View, Text, FlatList,ActivityIndicator,Image,TouchableOpacity } from 'react-native';
import makeApiRequest from '../api';
import { GET_ALL_REQUEST_URL,Image_URL } from '../apiUrls';
import styles from '../../css/styles';
import BottomMenu from '../menu/BottomMenu';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons'; 


const PrayerData = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [nextpage, setNextPage] = useState('');
  const [pagevalue, setPageValue] = useState(1);
  let[isLoading,setIsLoading] = useState(true);
  let[resData,setresData] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  
    const renderFooter = () => (
		<View>
		  {page <= totalPages ? (
			<Text>Loading more data...</Text>
		  ) : (
			<Text>No more data available.</Text>
		  )}
		</View>
	);     

  const fetchData = async (page_n) => {
    try {
		
		const sessionData = await AsyncStorage.getItem('sessionData');	
		await AsyncStorage.removeItem('random_number');
		//create api request to get user data
		//if(pagevalue!=0){
			if (sessionData !== null) {
				const parsedSessionData = JSON.parse(sessionData);
				let requestBody = {"user_id":parsedSessionData.user_id,"user_token":parsedSessionData.user_token};
				
				try {
				   
				   console.log("here");
				   var request_url = GET_ALL_REQUEST_URL+'?page='+page_n
				   let response = await makeApiRequest(request_url, 'POST', requestBody);
				   if(response.data){
					   setIsLoading(true)
					   let res_data = response.data;
						setData([...data, ...res_data]);
						
						console.log('data.length');
						console.log(res_data.length);
						
						if(response.data.length > 0){	
							
							setTotalPages(response.total);
							setresData(1);
							setIsLoading(false);
							return false;
						}
						console.log('resData');
						console.log(resData);
						console.log(response.data.length);
						
						
				   }
				   setIsLoading(false);
				} catch (error) {
				  console.error('Error fetching data:', error);
				} finally {
				  setIsLoading(false);
				}
				
				
			}
		//}
		
    } catch (error) {
      console.error('Error fetching data:', error); 
    } 
  };

  const handleLoadMore = async() => {
		//console.log(page);
		setPage((page) => page + 1);
		let newData = await fetchData(page);
		
		return false;
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
	
	const First100Words = ({ testName }) => {
		var get_data = testName.substring(0, 98) + '..';
		return get_data;
	}

  const renderItem = ({ item }) => (
  
	<View style={styles.item}>
	
		<View style={styles.icons_edit}>
			{item.image ? (
				<Image source={{ uri: item.image }} style={styles.upload_image_pd} />
			) : (
				<Image source={require('../../assets/user.png')} style={styles.upload_image_pd} />
			)}
			
			<View style={styles.TextCon}>
				<Text style={styles.postedAuthor}>{item.name}</Text>
				<Text style={styles.postedTime}>
					<DateTimeComponent dateString={item.created_at} /> 
				</Text>
			</View>
			
			<View style={styles.addPrayerBtn}>
				<TouchableOpacity style={styles.prayerBtn} onPress={() => handleItemPress(item)}>
					<Text style={styles.addPrayerText}>Add Prayer</Text>
				</TouchableOpacity>
			</View>
		</View>
	
		<Text style={styles.prayerText}><First100Words testName={item.content} /></Text>
		
		
		
	</View>
	
	
	
  );
  

  const renderEmpty = () => (
    
	<View>
		{isLoading ? (
			<View style={styles.footerContainer}>
			  <Text style={styles.noMoreDataText}>Loading</Text>
			</View>
		) : data.length === 0 ? (
			<View style={styles.footerContainer}>
			  <Text style={styles.noMoreDataText}>No Data exist</Text>
			</View>
		): (
			null
		)}
		
	</View>
	
  );
  
	const handleItemPress = (item) => {
		navigation.navigate('Survey1', { item });
	};

  return (
    <View style={styles.Topcontainer}>
		{isLoading && (
			<ActivityIndicator size="large" color="#68370E" style={styles.activityIndicator} />
		)} 
		
		<FlatList
			data={data}
			renderItem={renderItem}
			keyExtractor={(item) => item.id.toString()}
			onEndReached={handleLoadMore}
			onEndReachedThreshold={0.5}
			ListFooterComponent={renderEmpty}
		/>
	
		<Text style={styles.bottomText}></Text>
		<BottomMenu navigation={navigation}/>
    </View>
  );
};

export default PrayerData;