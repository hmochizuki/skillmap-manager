import firebase from "firebase/app";
import { collectionNames } from "firestore/types/collections";
import { Worksheet } from "firestore/types/Team";
import { AnswerDocument } from "firestore/types/Answer";
import { getYearMonth } from "util/getYearMonth";
import { FULL_SCORE } from "config/business";

export const getAllAnswersDocument = async (
  db: firebase.firestore.Firestore,
  teamId: string,
  userId: string
): Promise<AnswerDocument[]> => {
  const answerRef = db
    .collection(collectionNames.teams)
    .doc(teamId)
    .collection(collectionNames.users)
    .doc(userId)
    .collection(collectionNames.answers);

  const answersCollection = await answerRef.get();
  const allAnswers: any[] = [];
  answersCollection.forEach((e) => allAnswers.push(e.data()));

  return allAnswers as AnswerDocument[];
};

const calculatePoint = (worksheet: Required<Worksheet>) =>
  worksheet.map((category) => ({
    ...category,
    point:
      (category.questions.reduce((acc, q) => (q.checked ? acc + 1 : acc), 0) /
        category.questions.length) *
      FULL_SCORE,
  }));

export const updateAnswerDocument = async (
  db: firebase.firestore.Firestore,
  teamId: string,
  userId: string,
  data: Worksheet
): Promise<void> => {
  const yearMonth = getYearMonth();

  const answerRef = db
    .collection(collectionNames.teams)
    .doc(teamId)
    .collection(collectionNames.users)
    .doc(userId)
    .collection(collectionNames.answers)
    .doc(yearMonth);

  const updatedAt = new Date().getTime();

  const updatingData: Omit<AnswerDocument, "createdAt"> = {
    yearMonth,
    updatedAt,
    answer: calculatePoint(data),
  };

  return answerRef.set(updatingData, { merge: true });
};
