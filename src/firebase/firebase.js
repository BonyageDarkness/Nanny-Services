import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Конфигурация Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCYUTDA2FfVzdpi8Cn5iZ0JLQcJ28tsx3o",
  authDomain: "nanny-services-a.firebaseapp.com",
  projectId: "nanny-services-a",
  storageBucket: "nanny-services-a.appspot.com",
  messagingSenderId: "1066232107891",
  appId: "1:1066232107891:web:6bc209fbd6bca64953ab06",
  measurementId: "G-EL5305XJD2",
};

// Инициализация Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
