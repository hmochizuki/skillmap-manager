import firebase from "firebase/app";
import { collectionNames } from "firestore/types/collections";
import { TeamDocument, Worksheet } from "firestore/types/Team";
import { generateId } from "../../util/gengerateId";

export const getAllTeamIds = async (
  db: firebase.firestore.Firestore
): Promise<string[]> => {
  const allTeamSnapShot = await db.collection(collectionNames.teams).get();

  const allTeamId: string[] = [];
  allTeamSnapShot.forEach((snap) => allTeamId.push(snap.data().id));

  return allTeamId;
};

export const createTeamDocument = async (
  db: firebase.firestore.Firestore,
  teamId: string
) => {
  const teamRef = db.collection(collectionNames.teams).doc(teamId);
  const now = new Date().getTime();

  return db.runTransaction(async (transaction) => {
    const doc = await transaction.get(teamRef);
    if (doc.exists)
      return Promise.reject(new Error(`team id ${teamId} is already exists`));

    const data: TeamDocument = {
      id: teamId,
      worksheet: [],
      createdAt: now,
      updatedAt: now,
    };

    return transaction.set(teamRef, data);
  });
};

export const getWorksheetDocument = async (
  db: firebase.firestore.Firestore,
  teamId: string
): Promise<TeamDocument> => {
  const workSheetDoc = await db
    .collection(collectionNames.teams)
    .doc(teamId)
    .get();

  const workSheetData = workSheetDoc.data() as TeamDocument;

  return workSheetData;
};

export const updateWorksheet = async (
  db: firebase.firestore.Firestore,
  id: string,
  data: Worksheet
): Promise<void> => {
  const filterdData = data.map((category) => ({
    ...category,
    questions: category.questions.filter(({ value }) => value !== ""),
  }));

  const dataHasIds = filterdData.map((category) => {
    const categoryHasId = generateId(category);
    const questionsHasId = category.questions.map((q) => generateId(q));

    return { ...categoryHasId, questions: questionsHasId };
  });

  const workSheetRef = db.collection(collectionNames.teams).doc(id);
  const updatedAt = new Date().getTime();

  return workSheetRef.set(
    { worksheet: dataHasIds, updatedAt },
    { merge: true }
  );
};
