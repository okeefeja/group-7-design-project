import { firebaseConfig } from "./firebaseConfig";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { addUser } from "./src/services/API";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  StorageReference,
  getMetadata,
} from "firebase/storage";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);

export function loginWithEmail(
  email: string,
  password: string,
  setError: (error: any) => void
) {
  signInWithEmailAndPassword(auth, email, password).catch((error) => {
    setError(error.message);
  });
}

export function signUpUser(
  email: string,
  password: string,
  username: string,
  setError: (error: any) => void
) {
  createUserWithEmailAndPassword(auth, email, password)
    .then(async () => {
      if (auth.currentUser?.uid) {
        await addUser({
          id: auth.currentUser.uid,
          username: username,
          email: email,
        });
      }
    })
    .catch((error) => {
      setError(error.message);
    });
}

export async function uploadImage(
  userId: string,
  imageFile: File | Blob,
  onSuccess: (url: string) => void,
  onError: (error: any) => void
) {
  const storageRef = ref(storage, `images/${userId}`);

  try {
    // Check if the path (folder) exists in storage
    const pathExists = await checkIfPathExists(storageRef);

    if (pathExists) {
      // Check if the user already has an existing image
      const existingImageUrl = await getDownloadURL(storageRef);

      // If an existing image is found, delete it from storage
      if (existingImageUrl) {
        await deleteExistingImage(storageRef);
      }
    }

    // Upload the new image
    await uploadBytes(storageRef, imageFile);

    // Get the download URL of the newly uploaded image
    const url = await getDownloadURL(storageRef);
    onSuccess(url);
  } catch (error) {
    onError(error);
  }
}

async function checkIfPathExists(
  storageRef: StorageReference
): Promise<boolean> {
  try {
    const metadata = await getMetadata(storageRef);
    return !!metadata;
  } catch (error: any) {
    if (error.code === "storage/object-not-found") {
      return false;
    }
    throw error;
  }
}

async function deleteExistingImage(storageRef: StorageReference) {
  try {
    await deleteObject(storageRef);
  } catch (error) {
    // Handle deletion error if needed
    console.error("Error deleting existing image:", error);
  }
}
