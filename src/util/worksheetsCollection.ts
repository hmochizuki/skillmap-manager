import firebase from "firebase/app";
import { collectionNames } from "config/collections";
import { WorksheetDocument, Worksheet } from "types/workSheet";

export const getWorksheetDocument = async (
  db: firebase.firestore.Firestore,
  id: string
): Promise<WorksheetDocument> => {
  const workSheetDoc = await db
    .collection(collectionNames.worksheets)
    .doc(id)
    .get();

  const workSheetData = workSheetDoc.data() as WorksheetDocument;

  return workSheetData;
};

export const updateWorksheetDocument = async (
  db: firebase.firestore.Firestore,
  id: string,
  data: Worksheet
): Promise<void> => {
  const workSheetRef = db.collection(collectionNames.worksheets).doc(id);
  const updatedAt = new Date().getTime();

  return workSheetRef.set({ worksheet: data, updatedAt }, { merge: true });
};
