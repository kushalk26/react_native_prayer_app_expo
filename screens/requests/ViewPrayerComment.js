import React, { useState,useEffect } from 'react'
import { Button } from 'react-native'
import { View, Text,TouchableOpacity,TextInput,Image,ScrollView,ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons'; 
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import makeApiRequest from '../api';
import { GET_COMMENT_URL } from '../apiUrls';

import styles from '../../css/styles';
import BottomMenu from '../menu/BottomMenu';

function ViewPrayerComment({ navigation }) {
  const [text, setText] = useState('');
  let[isLoading,setIsLoading] = useState(true);
 
	const route = useRoute();
	const { item_data } = route.params;
	const [page, setPage] = useState(1);
    const[data,setData] = useState('');

  
  return (		 
	
	<View style={styles.TopRequestcontainer}> 
		
		<ScrollView contentContainerStyle={styles.container_scroll_req} >
			<View style={styles.comment}>
				<Text style={styles.churchTitle}>{item_data.name}</Text>
				<Text>{item_data.comment}</Text>
			</View>
		</ScrollView> 
		<Text style={styles.bottomText}></Text>
		<BottomMenu navigation={navigation}/>
    </View>

  );
}

export default ViewPrayerComment;
