import firebase from "firebase/app";
import { collectionNames } from "config/collections";
import { WorksheetDocument, Worksheet } from "types/workSheet";
import { generateId } from "./gengerateId";

export const getWorksheetDocument = async (
  db: firebase.firestore.Firestore,
  id: string
): Promise<WorksheetDocument> => {
  const workSheetDoc = await db.collection(collectionNames.teams).doc(id).get();

  const workSheetData = workSheetDoc.data() as WorksheetDocument;

  return workSheetData;
};

export const updateWorksheetDocument = async (
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
