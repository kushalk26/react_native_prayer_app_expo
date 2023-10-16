import { initializeApp } from 'firebase/app';

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyD2lVFE_wZQQzzdTr54-F4eWDKvxT0QUMg',
  authDomain: 'cristano-app.firebaseapp.com',
  databaseURL: 'https://cristano-app.firebaseio.com',
  projectId: 'cristano-app',
  storageBucket: 'cristano-app.appspot.com',
  appId: '1:159270239705:android:63ff850350d4a7ffdcadc8',
};

const app = initializeApp(firebaseConfig);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase