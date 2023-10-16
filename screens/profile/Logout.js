import React, { useState } from 'react'
import { Button } from 'react-native'
import { View, Text,TouchableOpacity,TextInput,Image,ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { FontAwesome } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons'; 
import { SimpleLineIcons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons';

import styles from '../../css/styles';
import BottomMenu from '../menu/BottomMenu';

function Logout({ navigation }) {
	
	const handleLogout = async() => { 
		await AsyncStorage.removeItem('sessionData');
		await AsyncStorage.removeItem('user_token');
		await AsyncStorage.removeItem('profile_picture');
		navigation.navigate('LoginScreen');
	};
   
  return (
    <View style={styles.TopAccountcontainer}>
		{/* Account fields */}
			<View style={styles.paddingContainer}>
			
				<View style={styles.boxContainerNew}>
					
					<View style={styles.icons_edit}>
						<Image source={require('../../assets/logo-church_large.png')} style={styles.user_img} />
					</View>
				
					<Text style={styles.logoutTitle}>Are you sure, you wish to logout your account</Text>
					
					<TouchableOpacity onPress={handleLogout} style={styles.logout}>
						<Text style={styles.loginText}>Logout</Text> 
					</TouchableOpacity>
					
				</View>
				
			</View>
			
		<BottomMenu navigation={navigation}/>
    </View>

  );
}

export default Logout;
