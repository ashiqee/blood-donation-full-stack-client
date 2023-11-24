import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import app from "../Config/Firebase/firebase.config";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null)
const AuthProvider = ({ children }) => {
    const auth = getAuth(app)
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)




    const createUser = (email, password) => {

        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const updateUser = (name, photo) => {
        console.log(name, photo);
        setLoading(true)
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo,

        })

    }

    const signIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }


    const logOut = () => {
        setLoading(true)
        return signOut(auth)
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            if (currentUser) {
                const userInfo = { email: currentUser.email }
                console.log(userInfo);
                setLoading(false)
            }
            console.log('State Check user is', currentUser);
        });
        return () => {
            return unSubscribe()
        }

    }, [auth])
    const authInfo = {
        loading,
        createUser,
        signIn,
        user,
        updateUser,
        logOut,

    }
    return (<AuthContext.Provider value={authInfo} >{children}</AuthContext.Provider>
    );
};

export default AuthProvider;