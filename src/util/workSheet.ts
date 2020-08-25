import firebase from "firebase/app";
import { collectionNames } from "config/collections";
import { WorkSheetCollection, WorkSheet } from "types/workSheet";

export const getWorkSheet = async (
  db: firebase.firestore.Firestore,
  id: string
): Promise<WorkSheetCollection> => {
  const workSheetDoc = await db
    .collection(collectionNames.workSheets)
    .doc(id)
    .get();

  const workSheetData = workSheetDoc.data() as WorkSheetCollection;

  return workSheetData;
};

export const updateWorkSheet = async (
  db: firebase.firestore.Firestore,
  id: string,
  data: WorkSheet
): Promise<void> => {
  const workSheetRef = db.collection(collectionNames.workSheets).doc(id);

  return workSheetRef.set({ workSheet: data }, { merge: true });
};
