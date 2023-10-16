import firebase from 'firebase/app';
import 'firebase/firestore';

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyD2lVFE_wZQQzzdTr54-F4eWDKvxT0QUMg',
  authDomain: 'cristano-app.firebaseapp.com',
  databaseURL: 'https://cristano-app.firebaseio.com',
  projectId: 'cristano-app',
  storageBucket: 'cristano-app.appspot.com',
  appId: '1:159270239705:android:63ff850350d4a7ffdcadc8',
};

//if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
//}

const InsertRecordExample = async () => {
  const collectionName = 'yourCollectionName';

  try {
    const db = firebase.firestore();
    await db.collection(collectionName).add({
      field1: 'Value 1',
      field2: 'Value 2',
    });
    console.log('Record inserted successfully!');
    // Additional logic after successful insertion
  } catch (error) {
    console.log('Error inserting record:', error.message);
    // Handle error
  }
};

export default InsertRecordExample;