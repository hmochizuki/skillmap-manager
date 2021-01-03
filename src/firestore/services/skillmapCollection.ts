import { getYearMonth } from "util/getYearMonth";
import { collectionNames } from "firestore/types/collections";
import { SkillmapDocument, Score } from "firestore/types/Skillmap";
import { Worksheet } from "firestore/types/Team";
import calculateDeviation from "util/calculateDeviation";

export const getAllSkillmapDocument = async (
  db: firebase.firestore.Firestore,
  teamId: string
): Promise<SkillmapDocument[]> => {
  const skillmapRef = db
    .collection(collectionNames.teams)
    .doc(teamId)
    .collection(collectionNames.skillmap);

  const skillmapCollection = await skillmapRef.get();
  const allSkillamp: any[] = [];
  skillmapCollection.forEach((e) => allSkillamp.push(e.data()));

  return allSkillamp as SkillmapDocument[];
};

export const updateSkillmapDocument = async (
  db: firebase.firestore.Firestore,
  teamId: string,
  user: { id: string; name: string },
  data: Worksheet
) => {
  const yearMonth = getYearMonth();

  const skillmapRef = db
    .collection(collectionNames.teams)
    .doc(teamId)
    .collection(collectionNames.skillmap)
    .doc(yearMonth);

  const updatedAt = new Date().getTime();

  db.runTransaction(async (transaction) => {
    const skillmapDoc = await transaction.get(skillmapRef);
    if (!skillmapDoc) return new Error("Skillmap document is not exsit!");

    const pre =
      (skillmapDoc.data() as SkillmapDocument) ||
      ({
        yearMonth,
        answeredUsers: [],
        scores: [],
        updatedAt: 0,
      } as SkillmapDocument);

    const isMultipleAnswer = pre.answeredUsers.some(({ id }) => id === user.id);

    const answeredUsers = isMultipleAnswer
      ? pre.answeredUsers
      : [...pre.answeredUsers, user];

    const scores: Score[] = data.map((category) => {
      const preScore = pre.scores.find((e) => e.categoryId === category.id);

      const point =
        (category.questions.filter(({ checked }) => checked === true).length /
          category.questions.length) *
        100;

      const answeres = preScore
        ? [
            ...preScore.answeres.filter((a) => a.userId !== user.id),
            { userId: user.id, point },
          ]
        : [{ userId: user.id, point }];

      const total = answeres.reduce((acc, cur) => acc + cur.point, 0);
      const average = total / answeres.length;
      const deviation = calculateDeviation(answeres.map((ans) => ans.point));

      return {
        categoryId: category.id,
        category: category.name,
        total,
        average,
        deviation,
        answeres,
      };
    });

    return transaction.set(
      skillmapRef,
      {
        yearMonth,
        scores,
        answeredUsers,
        updatedAt,
      },
      { merge: true }
    );
  });
};
