import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore';
import { apiKey } from './API';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: apiKey,
  authDomain: 'maximal-murdle-1c4fa.firebaseapp.com',
  projectId: 'maximal-murdle-1c4fa',
  storageBucket: 'maximal-murdle-1c4fa.appspot.com',
  messagingSenderId: '516676134782',
  appId: '1:516676134782:web:7c7e99ea7ab1112eb6b52f',
  measurementId: 'G-QSQF3NS2LD'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const db = getFirestore(app);
/* enableIndexedDbPersistence(db).catch((err) => {
  console.log(err);
});
 */
export { auth, db };
