// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDxF347sIFGESgW55bbR1RbWhogHZ7KxMM",
  authDomain: "resepkita-25d54.firebaseapp.com",
  projectId: "resepkita-25d54",
  storageBucket: "resepkita-25d54.appspot.com",
  messagingSenderId: "714622495606",
  appId: "1:714622495606:web:d2b2fe21f874b449492857",
  measurementId: "G-XLYGMCX5D2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export const db = getFirestore(app);
