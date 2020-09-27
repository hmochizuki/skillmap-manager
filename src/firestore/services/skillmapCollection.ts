import { getYearMonth } from "util/getYearMonth";
import { collectionNames } from "firestore/types/collections";
import { SkillmapDocument, Score } from "firestore/types/Skillmap";
import { Worksheet } from "firestore/types/Team";

export const updateSkillmapDocument = async (
  db: firebase.firestore.Firestore,
  teamId: string,
  userId: string,
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

    const pre = skillmapDoc.data() as SkillmapDocument;

    const isMultipleAnswer = pre.answeredUsers.some((u) => u === userId);

    const answeredUsers = isMultipleAnswer
      ? pre.answeredUsers
      : [...pre.answeredUsers, userId];

    const scores: Score[] = data.map((category) => {
      const preScore = pre.scores.find((e) => e.categoryId === category.id);

      const point =
        (category.questions.filter(({ checked }) => checked === true).length /
          category.questions.length) *
        100;

      const answeres = preScore
        ? [
            ...preScore.answeres.filter((a) => a.userId !== userId),
            { userId, point },
          ]
        : [{ userId, point }];

      const total = answeres.reduce((acc, cur) => acc + cur.point, 0);

      const average = total / answeres.length;

      const variance =
        answeres.reduce((acc, cur) => (acc + (average - cur.point)) ** 2, 0) /
        answeres.length;

      return {
        categoryId: category.id,
        category: category.name,
        total,
        average,
        variance,
        answeres,
      };
    });

    return transaction.update(skillmapRef, {
      scores,
      answeredUsers,
      updatedAt,
    });
  });
};
