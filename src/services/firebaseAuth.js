import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import app from '../config/ firebaseConfig';

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const signInWithGoogle = () => signInWithPopup(auth, provider);

export { auth, signInWithGoogle };
