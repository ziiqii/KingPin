import { useEffect } from "react";
import { getAuth } from "firebase/auth";
import { db } from "../../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import ScreenStack from "../../navigators/ScreenStack";

const HomeScreen = () => {
  const auth = getAuth();

  useEffect(() => {
    createUserIfNotExist();
  }, []);

  const createUserIfNotExist = async () => {
    const data = {
      email: auth.currentUser?.email,
      uid: auth.currentUser?.uid,
    };

    // Currently using email to identify our users, easier to view and test.
    // Consider switching to uid in future for consistency and security.
    // This is the target document.
    const newUserRef = doc(db, "users", auth.currentUser?.email); // doc(reference, collection, docName)

    // Fetches latest document snapshot, else undefined.
    const newUserSnap = await getDoc(newUserRef);

    if (newUserSnap.exists()) {
      console.log(`User ${auth.currentUser?.email}'s file already exists!`);
    } else {
      try {
        await setDoc(newUserRef, data); // setDoc(reference, data)
        console.log("New user doc written with ID: ", newUserRef.id);
      } catch (error) {
        console.error("Error adding user:", error);
      }
    }
  };

  return <ScreenStack />;
};

export default HomeScreen;
