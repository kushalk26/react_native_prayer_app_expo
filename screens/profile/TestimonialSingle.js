import React, { useState } from 'react'
import { Button } from 'react-native'
import { View, Text,TouchableOpacity,TextInput,Image,ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { FontAwesome } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons'; 
import { SimpleLineIcons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from '../../css/styles';
import BottomMenu from '../menu/BottomMenu';

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

function TestimonialSingle({ navigation }) {
	
    const route = useRoute();
	const { item_data } = route.params;
   
  return (
   <View style={styles.Topcontainer}>

		<ScrollView contentContainerStyle={styles.container}>
		
		  <View >
			<View style={styles.icons_edit}>
				{item_data.image ? (
					<Image source={{ uri: item_data.image }} style={styles.upload_image_pd} />
					
				) : (
					<Image source={require('../../assets/user.png')} style={styles.upload_image_pd} />
				)}
				
				<View style={styles.TextCon}>
					<Text style={styles.postedAuthor}>{item_data.name}</Text>
					<Text style={styles.postedTime}><DateTimeComponent dateString={item_data.created_at} /></Text>
					
				</View>
				
			</View>
			
			<Text style={styles.itemText}>{item_data.testimonial_name}</Text>
			<Text style={styles.itemText}></Text>
			
		  </View>
		  
		  {/* Add more items as needed */}
		</ScrollView>
		<BottomMenu navigation={navigation}/>
    </View>
  );
}

export default TestimonialSingle;
