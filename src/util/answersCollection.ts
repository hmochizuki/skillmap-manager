import firebase from "firebase/app";
import { collectionNames } from "config/collections";
import { Worksheet } from "types/workSheet";
import { AnswerDocument, Answer } from "types/Answer";

export const getAnswerDocument = async (
  db: firebase.firestore.Firestore,
  userId: string
): Promise<AnswerDocument> => {
  const workSheetDoc = await db
    .collection(collectionNames.answers)
    .doc(userId)
    .get();

  const answersDod = workSheetDoc.data() as AnswerDocument;

  return answersDod;
};

export const updateAnswerDocument = async (
  db: firebase.firestore.Firestore,
  userId: string,
  teamId: string,
  data: Required<Worksheet>
): Promise<void> => {
  const answerRef = db.collection(collectionNames.answers).doc(userId);
  const updatedAt = new Date().getTime();
  const now = new Date();

  const updatingData: Answer = {
    teamId,
    yearMonth: `${now.getFullYear()}${(now.getMonth() + 1)
      .toString()
      .padStart(2, "0")}`,
    worksheet: data,
  };

  return answerRef.update({
    answers: firebase.firestore.FieldValue.arrayUnion(updatingData),
    updatedAt,
  });
};
