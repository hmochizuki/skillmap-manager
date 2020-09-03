import firebase from "firebase/app";
import { collectionNames } from "firestore/types/collections";
import { Worksheet } from "firestore/types/Team";
import { AnswerDocument, Answer } from "firestore/types/Answer";

export const getAnswerDocument = async (
  db: firebase.firestore.Firestore,
  teamId: string,
  userId: string
): Promise<AnswerDocument> => {
  const workSheetDoc = await db
    .collection(collectionNames.teams)
    .doc(teamId)
    .collection(collectionNames.users)
    .doc(userId)
    .get();

  const answersDod = workSheetDoc.data() as AnswerDocument;

  return answersDod;
};

const calculatePoint = (worksheet: Required<Worksheet>) =>
  worksheet.map((category) => ({
    ...category,
    point:
      (category.questions.reduce((acc, q) => (q.checked ? acc + 1 : acc), 0) /
        category.questions.length) *
      100,
  }));

export const updateAnswerDocument = async (
  db: firebase.firestore.Firestore,
  teamId: string,
  userId: string,
  data: Required<Worksheet>
): Promise<void> => {
  const answerRef = db
    .collection(collectionNames.teams)
    .doc(teamId)
    .collection(collectionNames.users)
    .doc(userId);
  const updatedAt = new Date().getTime();
  const now = new Date();
  const yearMonth = `${now.getFullYear()}${(now.getMonth() + 1)
    .toString()
    .padStart(2, "0")}`;

  const updatingData: Answer = {
    [yearMonth]: calculatePoint(data),
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
