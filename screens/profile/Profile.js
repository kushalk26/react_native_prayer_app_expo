import React, { useState,useEffect } from 'react'
import { Button,BackHandler } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

import { View, Text, TouchableOpacity, TextInput, Image, ScrollView, SafeAreaView, Share } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { FontAwesome } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons'; 
import { SimpleLineIcons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons';

import styles from '../../css/styles';
import BottomMenu from '../menu/BottomMenu';

function Profile({ navigation }) {
	const [image, setImage] = useState(null);
	const [email, setEmail] = useState(null);
	const [name, setName] = useState(null);
	
	//getting profile image
	const fetchProfileImage = async() => { 
		const sessionData = await AsyncStorage.getItem('sessionData');   
		const profile_picture = await AsyncStorage.getItem('profile_picture');       
		
		if (profile_picture !== null) {
			setImage(profile_picture);
		}
		
		if (sessionData !== null) {
			const parsedSessionData = JSON.parse(sessionData);			
			setEmail(parsedSessionData.email);
			setName(parsedSessionData.name); 
			console.log(profile_picture); 
		} 
	}
	
	const shareData = async () => {
        try {
            await Share.share({
                message: `Give it a try, and I'm sure you'll love it as much as I do! Feel free to share your thoughts and experiences. \n\nDownload now from http://www.prayerboxdrop.com/`,
            });
        } catch (error) {
            alert(error.message);
        }
    };
	
	useEffect(() => {     
		fetchProfileImage();		
	}, []);
   
  return (
    <View style={styles.TopProfilecontainer}>
		{/* Profile View */}
			<View style={styles.paddingContainer}>
			<View style={styles.profileContainer}>
				<View style={styles.profileContainerOutsideView}>
					<View style={styles.profileContainerView}>  
						{image ? (
							<Image source={{ uri: image }} style={styles.profile_logo} />
						  ) : (
							<Image source={require('../../assets/user.png')} style={styles.profile_logo} />
						  )}	
					</View>
					<View style={styles.profileContainerViewText}>
						 
						{name && (
							<Text style={styles.profileTitle}>{name}</Text> 
						)} 
						
						{email && (
							<Text style={styles.profileEmail}>{email}</Text>
						)} 
					</View>
				</View>
				<View style={styles.profileContainerEdit}> 
					<TouchableOpacity onPress={() => navigation.navigate('MyAccount')}>
						<Text style={styles.textReq}><FontAwesome name="edit" size={22} color="#fff" /></Text>
					</TouchableOpacity>
				</View>
			</View>
			</View>
		
		{/* Account Area */}
			<ScrollView  style={styles.scrollView}> 
			<View style={styles.paddingContainer}>
			<View style={styles.profileAccountContainer}>
			
				<TouchableOpacity onPress={() => navigation.navigate('MyAccount')}>
					<View style={styles.accountContainerOutsideView}>
						<View style={styles.accountContainerView}> 
							<FontAwesome name="user" size={24} color="#68370E" />	
						</View>
						<View style={styles.profileContainerViewText}>
							<Text style={styles.accountTitle}>My Account</Text>  							
							<Text style={styles.accountDes}>Make changes to your account</Text>  
						</View>				
					</View>
				</TouchableOpacity>	 
				
				<TouchableOpacity onPress={() => navigation.navigate('Requests')}>
					<View style={styles.accountContainerOutsideView}>
						<View style={styles.accountContainerView}> 
							<FontAwesome name="edit" size={24} color="#68370E" />	
						</View>
						<View style={styles.profileContainerViewText}>
							<Text style={styles.accountTitle}>Prayer Request</Text>  
							<Text style={styles.accountDes}>Create your requests</Text>  
						</View>				
					</View>
				</TouchableOpacity>
				
				<TouchableOpacity onPress={() => navigation.navigate('Prayer')}>
					<View style={styles.accountContainerOutsideView}>
						<View style={styles.accountContainerView}> 
							<FontAwesome5 name="praying-hands" size={24} color="#68370E" />	
						</View>
						<View style={styles.profileContainerViewText}>
							<Text style={styles.accountTitle}>Intercessory Prayers</Text>
							<Text style={styles.accountDes}>Add your prayers</Text>   
						</View>	
					</View>
				</TouchableOpacity>
				
				<TouchableOpacity onPress={() => navigation.navigate('Testimonial')}> 
					<View style={styles.accountContainerOutsideView}>
						<View style={styles.accountContainerView}> 
							<FontAwesome name="quote-right" size={24} color="#68370E" />	
						</View>
						<View style={styles.profileContainerViewText}>
							<Text style={styles.accountTitle}>Testimonials</Text>  
							<Text style={styles.accountDes}>See Testimonials</Text>  

						</View>				
					</View>
				</TouchableOpacity>
				
				
				<View style={styles.accountContainerOutsideView}>
					<View style={styles.accountContainerView}> 
						<FontAwesome name="support" size={24} color="#68370E" />
					</View>
					<View style={styles.profileContainerViewText}>
						<Text style={styles.accountTitle}>Help & Support</Text>  
						<Text style={styles.accountDes}>Any issue chat with support</Text> 
						
					</View>				
				</View>
				
				<TouchableOpacity onPress={shareData}>
					<View style={styles.accountContainerOutsideView}>
						<View style={styles.accountContainerView}> 
							<AntDesign name="sharealt" size={24} color="#68370E" />
						</View>
						<View style={styles.profileContainerViewText}>
							<Text style={styles.accountTitle}>Share</Text>  
							<Text style={styles.accountDes}>Invite Friends</Text> 
						</View>				
					</View>
				</TouchableOpacity>
				
				<TouchableOpacity onPress={() => navigation.navigate('Logout')}>
					<View style={styles.accountContainerOutsideView}>
						<View style={styles.accountContainerView}> 	
							<AntDesign name="logout" size={24} color="#68370E" />
						</View>
						<View style={styles.profileContainerViewText}>
							
								<Text style={styles.accountTitle}>Logout</Text>  
							
							<Text style={styles.accountDes}>account logged out</Text> 
						</View>				 
					</View>
				</TouchableOpacity>
				
				
			</View>
			</View>
			</ScrollView>	

			<View style={{ "padding":30 }}>
				<BottomMenu navigation={navigation}/>
			</View>
			
			
		
    </View>

  );
}

export default Profile;
