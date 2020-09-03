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
  const answerRef = db
    .collection(collectionNames.teams)
    .doc(teamId)
    .collection(collectionNames.users)
    .doc(userId);
  const updatedAt = new Date().getTime();
  const now = new Date();
  const yearMonth = `${now.getFullYear()}${(now.getMonth() + 2)
    .toString()
    .padStart(2, "0")}`;

  const updatingData: Answer = {
    [yearMonth]: data,
  };

  return answerRef.set(
    {
      answers: updatingData,
      updatedAt,
    },
    {
      merge: true,
    }
  );
};
