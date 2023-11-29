import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import app from "../Config/Firebase/firebase.config";
import { createContext, useEffect, useState } from "react";
import usePublicAxios from "../hooks/usePublicAxios";

export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
  const auth = getAuth(app);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const axiosPublic = usePublicAxios();

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const updateUser = (name, photo) => {
    console.log(name, photo);
    setLoading(true);
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const userInfo = { email: currentUser.email };
        axiosPublic.post("/jwt", userInfo).then((res) => {
          if (res.data?.token) {
            localStorage.setItem("token", res.data?.token);

            setLoading(false);
          }
        });
        // console.log(userInfo);
      } else {
        localStorage.removeItem("token");
        setLoading(false);
      }

      // console.log("State Check user is", currentUser);
    });
    return () => {
      return unSubscribe();
    };
  }, [auth, axiosPublic]);
  const authInfo = {
    loading,
    createUser,
    signIn,
    user,
    updateUser,
    logOut,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
