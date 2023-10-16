import React, { useState,useEffect } from 'react'
import { Button } from 'react-native'
import { View,Image, ScrollView,Text,TouchableOpacity,TextInput } from 'react-native';

import { FontAwesome } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 
import { SimpleLineIcons } from '@expo/vector-icons'; 
import { useNavigationState } from '@react-navigation/native' 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import makeApiRequest from '../api';
import { NOTIFICATION_CHECK_URL } from '../apiUrls';

const BottomMenu = ({ navigation }) => {
	const routes = useNavigationState(state => state.routes)
	const currentRoute = routes[routes.length -1].name;
	const [data, setData] = useState('');
	useEffect(() => {     
		console.log('fetch data');		
		fetchData();
		
	}, []);
	
	const fetchData = async() => { 
		
		const sessionData = await AsyncStorage.getItem('sessionData'); 
	
		if (sessionData !== null) {
			
			const parsedSessionData = JSON.parse(sessionData);
			let requestBody = {"user_id":parsedSessionData.user_id,"user_token":parsedSessionData.user_token};	
			const response = await makeApiRequest(NOTIFICATION_CHECK_URL, 'POST', requestBody);
			
			if(response.data){			
				setData(response.data);
			}
			
			
		}
	};
	
  return (		
	
	<View style={styles.container}> 
		
      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Requests')}>
        <Text style={styles.textReq}><FontAwesome color={currentRoute === 'Requests' ? '#68370E' : 'gray'} name="edit" size={22} /></Text>
      </TouchableOpacity>
	  
      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Prayer')}>
		<Text style={styles.textReq}><FontAwesome5 name="praying-hands" size={20} color={currentRoute === 'Prayer' ? '#68370E' : 'gray'} /></Text>
      </TouchableOpacity> 
	  
      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Testimonial')}>
        <Text style={styles.textReq}><MaterialCommunityIcons name="comment-quote-outline" size={22} color={currentRoute === 'Testimonial' ? '#68370E' : 'gray'} /></Text>
      </TouchableOpacity>
	  
	  <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Notification')}>
	  
		{data > 0 ? (
			<View style={styles.notification_icon}>
				
			</View>
		) : null}
	  
		
		
        <Text style={styles.textReq}><FontAwesome name="bell-o" size={20} color={currentRoute === 'Notification' ? '#68370E' : 'gray'} />
			
		</Text>
		
		
      </TouchableOpacity>
	  
	  <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('ProfileScreen')}>
        <Text style={styles.textReq}><FontAwesome name="user-o" size={20} color={currentRoute === 'ProfileScreen' ? '#68370E' : 'gray'} /></Text>
		
      </TouchableOpacity>
	  
    </View>

  );
}

const styles = {
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 55,
    backgroundColor: '#fff',
	position: 'absolute',
	bottom: 1,
    left: 1,
    right: 1,
	elevation: 25,
  },
  menuItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuText: {
    fontSize: 16,
    color: '#333',
  },
	notification_icon:{
		width:13,
		height:13,
		borderRadius: 25,
		backgroundColor: 'red', // Set the background color of the icon
		justifyContent: 'center',
		alignItems: 'center',
		
		marginLeft:20,
		marginTop:-10
	},
	
};

export default BottomMenu;
