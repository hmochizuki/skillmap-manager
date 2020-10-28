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

export const updateUserDocument = async (
  db: firebase.firestore.Firestore,
  data: Omit<UserDocument, "teams" | "createdAt" | "updatedAt">
): Promise<void> => {
  const userRef = await db.collection(collectionNames.users).doc(data.id);
  const now = new Date().getTime();

  return userRef.update({
    ...data,
    updatedAt: now,
  });
};

export const createUser = async (
  db: firebase.firestore.Firestore,
  data: Omit<UserDocument, "teams" | "createdAt" | "updatedAt">
): Promise<void> => {
  const userRef = db.collection(collectionNames.users).doc(data.id);
  const now = new Date().getTime();

  return userRef.set({
    ...data,
    teams: [],
    createdAt: now,
    updatedAt: now,
  });
};

export const joinTeam = async (
  db: firebase.firestore.Firestore,
  userId: string,
  teamdId: string
) => {
  const userRef = db.collection(collectionNames.users).doc(userId);

  return db.runTransaction(async (transaction) => {
    const data = (await transaction.get(userRef)).data();

    if (!data)
      return Promise.reject(
        new Error(`user is not exists, that id is ${userId}`)
      );

    const next = {
      ...data,
      teams: [...data.teams, teamdId],
    };

    return transaction.set(userRef, next);
  });
};
