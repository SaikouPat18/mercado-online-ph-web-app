import { initializeApp } from 'firebase/app';
import { getAuth, signOut as firebaseSignOut, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, EmailAuthProvider, linkWithCredential } from 'firebase/auth';
import { getFirestore, collection, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore';
import { firebaseConfig } from '../firebase-config';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

// Sign in with email and password
export const signInWithEmail = async (email, password) => {
    try {
        return await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        throw new Error(error.message);
    }
};

// Sign up with email and password
export const signUpWithEmail = async (email, password) => {
    try {
        return await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
        throw new Error(error.message);
    }
};

// Sign in with Google
export const signInWithGoogle = async () => {
    try {
        return await signInWithPopup(auth, googleProvider);
    } catch (error) {
        throw new Error(error.message);
    }
};

// Add password to Google account
export const addPasswordToGoogleUser = async (email, password) => {
    const credential = EmailAuthProvider.credential(email, password);
    const user = auth.currentUser;
    if (user) {
        try {
            await linkWithCredential(user, credential);
            return true;
        } catch (error) {
            throw new Error(error.message);
        }
    }
    return false;
};

// Sign out
export const signOut = () => firebaseSignOut(auth);

// Firestore Functions
export const fetchProducts = async () => {
    try {
        const querySnapshot = await getDocs(collection(firestore, 'products'));
        return querySnapshot.docs.map(doc => doc.data());
    } catch (error) {
        throw new Error(error.message);
    }
};

export const addProduct = async (product) => {
    try {
        const docRef = await addDoc(collection(firestore, 'products'), product);
        return docRef.id;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const updateProduct = async (id, product) => {
    try {
        const productRef = doc(firestore, 'products', id);
        await updateDoc(productRef, product);
    } catch (error) {
        throw new Error(error.message);
    }
};

export { auth, firestore, googleProvider };
