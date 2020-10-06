import firebase from "firebase/app";
import { collectionNames } from "firestore/types/collections";
import { UserDocument } from "firestore/types/User";

export const getUserDocument = async (
  db: firebase.firestore.Firestore,
  userId: string
): Promise<UserDocument> => {
  const userDoc = await db.collection(collectionNames.users).doc(userId).get();

  const user = userDoc.data() as UserDocument;

  return user;
};

export const createUser = async (
  db: firebase.firestore.Firestore,
  data: Pick<UserDocument, "id" | "name">
): Promise<void> => {
  const userRef = db.collection(collectionNames.users).doc(data.id);
  const now = new Date().getTime();

  return userRef.set({
    data,
    team: [],
    createdAt: now,
    updatedAt: now,
  });
};
