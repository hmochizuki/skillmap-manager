import firebase from "firebase/app";
import shortid from "shortid";
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

const generateId = (data: Record<string, unknown>) => {
  if (data.id) return data;
  const id = shortid.generate();

  return { ...data, id };
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

  const workSheetRef = db.collection(collectionNames.worksheets).doc(id);
  const updatedAt = new Date().getTime();

  return workSheetRef.set(
    { worksheet: dataHasIds, updatedAt },
    { merge: true }
  );
};
