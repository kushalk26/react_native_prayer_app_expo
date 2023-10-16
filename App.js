import React,{ useState,useEffect } from 'react';
import { ActivityIndicator  } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import LoginScreen from './screens/LoginScreen';

import RegistrationScreen from './screens/RegistrationScreen';
import ForgetPasswordScreen from './screens/ForgetPasswordScreen';
import AllScreen from './screens/AllScreen';

import FirstScreen from './screens/prayer/FirstScreen'; 
import PrayerData from './screens/prayer/PrayerData'; 
import CreatePrayer from './screens/prayer/CreatePrayer'; 
import NotificationScreen from './screens/notification/NotificationScreen';
 
import Survey1Screen from './screens/survey/Survey1Screen';  
import Survey2Screen from './screens/survey/Survey2Screen';  

import CreateRequest from './screens/requests/CreateRequest';
import AddTestimonial from './screens/requests/AddTestimonial';
import RequestData from './screens/requests/RequestData';
import ViewRequest from './screens/requests/ViewRequest';
import EditRequest from './screens/requests/EditRequest';
import ViewPrayerComment from './screens/requests/ViewPrayerComment';

import BottomMenu from './screens/menu/BottomMenu';

import Profile from './screens/profile/Profile';
import MyAccount from './screens/profile/MyAccount';
import Logout from './screens/profile/Logout';
import Testimonial from './screens/profile/Testimonial';
import TestimonialSingle from './screens/profile/TestimonialSingle';
import SingleNotification from './screens/notification/SingleNotification';
 
const Stack = createStackNavigator();

function App() {
	
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const value = await AsyncStorage.getItem('user_token');
		setIsLoggedIn(value.user_id !== null);			  
    } catch (error) {
      console.log('Error while checking user login status:', error);
    }
	
  };
	
  return (
    <NavigationContainer>
      <Stack.Navigator>
		
		{isLoggedIn ? (
			null
		  ) : (
			<Stack.Screen name="Login" component={LoginScreen} options={{
			  title: '',
			  headerStyle: { backgroundColor: '#fff' },
			  headerTintColor: '#000',
			}} />
		)} 
		 
		<Stack.Screen name="ProfileScreen" component={Profile} options={{
          title: 'Profile',
          headerStyle: { backgroundColor: '#fff' },
          headerTintColor: '#000',
		  headerLeft: null,
        }}/>
	
		
		<Stack.Screen name="LoginScreen" component={LoginScreen} options={{
			  title: 'Login',
			  headerStyle: { backgroundColor: '#fff' },
			  headerTintColor: '#000',
		}} />
	  
		<Stack.Screen name="FirstScreen" component={FirstScreen} options={{
          title: '',
          headerStyle: { backgroundColor: '#fff' },
          headerTintColor: '#000',
        }}/>
	  
        <Stack.Screen name="Registration" component={RegistrationScreen} options={{
          title: 'Register',
          headerStyle: { backgroundColor: '#fff' },
          headerTintColor: '#000',
        }}/>
		
		<Stack.Screen name="ForgetPassword" component={ForgetPasswordScreen} options={{
          title: '',
          headerStyle: { backgroundColor: '#fff' },
          headerTintColor: '#000',
        }}/>
		
		<Stack.Screen name="All" component={AllScreen} options={{
          title: 'All',
          headerStyle: { backgroundColor: '#fff' },
          headerTintColor: '#000',
        }}/>
		
		<Stack.Screen name="Survey1" component={Survey1Screen} options={{
          title: 'Survey'
        }}/>
		<Stack.Screen name="Survey2" component={Survey2Screen} options={{
          title: 'Survey'
        }}/>
		
		
		<Stack.Screen name="CreateRequest" component={CreateRequest} options={{
          title: 'Create Request',
          headerStyle: { backgroundColor: '#fff' },
          headerTintColor: '#000',
        }}/>
		
		<Stack.Screen name="ViewRequest" component={ViewRequest} options={{
          title: 'View Request',
          headerStyle: { backgroundColor: '#fff' },
          headerTintColor: '#000',
        }}/>
		
		<Stack.Screen name="ViewPrayerComment" component={ViewPrayerComment} options={{
          title: 'View Comment',
          headerStyle: { backgroundColor: '#fff' },
          headerTintColor: '#000',
        }}/>
		
		<Stack.Screen name="Requests" component={RequestData} options={{
          title: 'Requests',
          headerStyle: { backgroundColor: '#fff' },
          headerTintColor: '#000',
        }}/>
		
		<Stack.Screen name="Prayer" component={PrayerData} options={{
          title: 'Prayers',
          headerStyle: { backgroundColor: '#fff' },
          headerTintColor: '#000',
        }}/>
		
		<Stack.Screen name="CreatePrayer" component={CreatePrayer} options={{
          title: 'Create Prayer',
          headerStyle: { backgroundColor: '#fff' },
          headerTintColor: '#000',
        }}/>	
		
		<Stack.Screen name="AddTestimonial" component={AddTestimonial} options={{
          title: 'Add Testimonial',
          headerStyle: { backgroundColor: '#fff' },
          headerTintColor: '#000',
        }}/>
		
		<Stack.Screen name="Notification" component={NotificationScreen} options={{
          title: 'Notification',
          headerStyle: { backgroundColor: '#fff' },
          headerTintColor: '#000',
        }}/>	
		
		
		
		<Stack.Screen name="MyAccount" component={MyAccount} options={{
          title: 'MyAccount',
          headerStyle: { backgroundColor: '#fff' },
          headerTintColor: '#000',
        }}/>
		
		
		
		<Stack.Screen name="Logout" component={Logout} options={{
          title: 'Logout',
          headerStyle: { backgroundColor: '#fff' },
          headerTintColor: '#000',
        }}/>
		
		<Stack.Screen name="Testimonial" component={Testimonial} options={{
          title: 'Testimonial',
          headerStyle: { backgroundColor: '#fff' },
          headerTintColor: '#000',
        }}/>
		
		<Stack.Screen name="TestimonialSingle" component={TestimonialSingle} options={{
          title: '',
          headerStyle: { backgroundColor: '#fff' },
          headerTintColor: '#000',
        }}/>
		
		<Stack.Screen name="SingleNotification" component={SingleNotification} options={{
          title: '',
          headerStyle: { backgroundColor: '#fff' },
          headerTintColor: '#000',
        }}/>
		
		
		
		<Stack.Screen name="EditRequest" component={EditRequest} options={{
          title: 'Edit',
          headerStyle: { backgroundColor: '#fff' },
          headerTintColor: '#000',
        }}/>
		
      </Stack.Navigator>
	  
    </NavigationContainer>
  );
}

export default App;