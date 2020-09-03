import firebase from "firebase/app";
import { collectionNames } from "firestore/types/collections";
import { TeamDocument, Worksheet } from "firestore/types/Team";
import { generateId } from "../../util/gengerateId";

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
