// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  User,
  confirmPasswordReset,
  connectAuthEmulator,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';
import { connectFunctionsEmulator, getFunctions, httpsCallable } from 'firebase/functions';
import { ApiRoute } from '../constants/fxns';


const USE_EMULATORS = false;

const firebaseConfig = {
  apiKey: 'AIzaSyDY-1FezjbzGmq1j3WHWurbniF3IIdYmEY',
  authDomain: 'pabgm-39720.firebaseapp.com',
  projectId: 'pabgm-39720',
  storageBucket: 'pabgm-39720.firebasestorage.app',
  messagingSenderId: '557051436284',
  appId: '1:557051436284:web:96f2e80c4cc4c927638b79',
  measurementId: 'G-VTGQQYSTP1',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const appAuth = getAuth();

const auth = {
  createUser(email: string, password: string) {
    return createUserWithEmailAndPassword(appAuth, email, password);
  },
  signIn(email: string, password: string) {
    return signInWithEmailAndPassword(appAuth, email, password);
  },
  resetPassword(email: string) {
    return sendPasswordResetEmail(appAuth, email);
  },
  confirmPassReset(code: string, newPass: string) {
    return confirmPasswordReset(appAuth, code, newPass);
  },
  logout() {
    return signOut(appAuth);
  },
  listen(cb: (val: User | null) => void) {
    onAuthStateChanged(appAuth, cb);
  },
};

const db = getFirestore(app);
const fxns = getFunctions(app);

const fx = {
  async call<T, B = any>(path: ApiRoute, data?: T) {
    const callable = httpsCallable<T, B>(fxns, path);
    const result = await callable(data??null);
    return result.data;
  },
};

const runEmulators = (val: boolean = USE_EMULATORS) => {
  const local = '127.0.0.1';
  if (val) {
    connectFirestoreEmulator(db, local, 8080);
    connectAuthEmulator(appAuth, `http://${local}:9099`);
    connectFunctionsEmulator(fxns, local, 5001);
  }
};

runEmulators();

export { app, auth, db, fx };

