// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { addDoc, collection, getDocs, getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

export interface CheckInCase {
    TimestampUserID: string,
    id: string
}

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyAYL5HzqVdHn-B4C1aslpPbXwIz3nAVdFo',
    authDomain: 'ntu-cnad.firebaseapp.com',
    projectId: 'ntu-cnad',
    storageBucket: 'ntu-cnad.appspot.com',
    messagingSenderId: '531997005970',
    appId: '1:531997005970:web:794d49a06aade3b96f2e4b',
    measurementId: 'G-XS6H9HP8TK'
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const db = getFirestore();

const colRef = collection(db, 'check-in');

export const getCheckInCases = () => (new Promise<CheckInCase[]>((res) => {
    getDocs(colRef)
        .then((snapshot) => {
            console.log(snapshot.docs);
            const books: any[] = [];
            snapshot.docs.forEach((doc) => {
                books.push({ ...doc.data(), id: doc.id });
            });
            setTimeout(() => res(books as CheckInCase[]), (Math.random() / 2 + 0.5) * 1500);
        });
}));

export const addCheckInCase = (TimestampUserID: string) => (new Promise<void>((res) => {
    addDoc(colRef, { TimestampUserID }).then(() => {
        setTimeout(() => {
            res();
        }, (Math.random() / 2 + 0.5) * 1500);
    });
}));