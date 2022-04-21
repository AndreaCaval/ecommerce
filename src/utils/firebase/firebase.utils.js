import { initializeApp } from "firebase/app";
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyBtRvrqmMUUjVqeo5iQxoy96mSmivNgcjY",
    authDomain: "ecommerce-8cdd8.firebaseapp.com",
    projectId: "ecommerce-8cdd8",
    storageBucket: "ecommerce-8cdd8.appspot.com",
    messagingSenderId: "573120251503",
    appId: "1:573120251503:web:480a80b4218849c2356f9a"
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider()
provider.setCustomParameters({
    prompt: "select_account"
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

export const db = getFirestore()

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid)
    console.log(userDocRef);

    const userSnapShot = await getDoc(userDocRef)
    console.log(userSnapShot);

    if (!userSnapShot.exists()) {
        const { displayName, email } = userAuth
        const createdAt = new Date()

        try {
            await setDoc(userDocRef, {
                displayName, email, createdAt
            })
        } catch (error) {
            console.log('error creating the user', error.message);
        }
    }

    return userDocRef
}