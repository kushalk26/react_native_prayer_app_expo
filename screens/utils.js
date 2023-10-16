import AsyncStorage from '@react-native-async-storage/async-storage';

export const checkIfUserLoggedIn = async () => {
  try {
    const value = await AsyncStorage.getItem('sessionData');
	if (value !== null) {
	  const parsedSessionData = JSON.parse(value);
	  console.log('Retrieved value:', parsedSessionData);
	  console.log('Kushal:', parsedSessionData.user_id);
	  return parsedSessionData.user_id !== null;
	} else {
	  console.log('Value does not exist.');
	  return false;
	}
    
  } catch (error) {
    console.log('Error while checking user login status:', error);
    return false;
  }
};