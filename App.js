import React from "react";
import "react-native-gesture-handler";
import AuthNavigation from "./navigators/AuthNavigator";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const App = () => {
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("user is signed in")
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid;
      // ...
    } else {
      // User is signed out
      // ...
      console.log("user is signed out")
    }
  });

  return <AuthNavigation />;
};

export default App;
