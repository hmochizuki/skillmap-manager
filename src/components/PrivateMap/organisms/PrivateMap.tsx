import React, { memo, FC, useMemo } from "react";
import { Typography, makeStyles, createStyles, Paper } from "@material-ui/core";
import PageTitle from "components/common/atoms/PageTitle";
import { AnswerDocument } from "firestore/types/Answer";
import Progress from "components/common/atoms/Progress";
import RadarChart from "../molecules/RadarChart";
import HistoryChart from "../molecules/HistoryChart";

const useStyles = makeStyles(() =>
  createStyles({
    graphChart: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
  })
);

type Props = {
  answers: AnswerDocument[];
  targetYearMonth: string;
};

const PrivateMap: FC<Props> = ({ answers, targetYearMonth }) => {
  const classes = useStyles();
  const targetAnswer = useMemo(
    () => answers.find((ans) => ans.yearMonth === targetYearMonth),
    [answers, targetYearMonth]
  );
  // const yearMonths = Object.keys(answers);
  // const categories = yearMonths.map((ym) => ({ ...answers[ym] }));
  // const dataForHistry = yearMonths.map((ym) => {
  //   return { yearMonth: ym, ...answers[ym] };
  // });
  const xDataKey = "yearMonth";

  // @ts-ignore
  // const allCategories: { id: string; name: string }[] = answers.reduce(
  //   // @ts-ignore
  //   (acc, ansDoc) => {
  //     const categories = ansDoc.answer.map((category) => ({
  //       id: category.id,
  //       name: category.name,
  //     }));

  //     return [...acc, ...categories];
  //   },
  //   []
  // );

  const convert = (
    answerDoc: AnswerDocument
  ): Record<string, number | string> => {
    const categoryNames = answerDoc.answer.reduce((acc, category) => {
      return { ...acc, [category.name]: category.point };
    }, []);

    // @ts-ignore
    return { yearMonth: answerDoc.yearMonth, ...categoryNames };
  };

  const getCategoryNames = (answerDoc: AnswerDocument): string[] => {
    // @ts-ignore
    return answerDoc.answer.reduce((acc, category) => {
      return [...acc, category.name];
    }, []);
  };

  // @ts-ignore
  const yDataKeys: string[] = getCategoryNames(answers[answers.length - 1]);

  const dataForHistory = answers.reduce(
    // @ts-ignore
    (acc, ansDoc) => [...acc, convert(ansDoc)],
    []
  );

  return (
    <>
      <PageTitle iconName="mySkillmap">Your Skillmap!!</PageTitle>
      <Paper elevation={5}>
        <div className={classes.graphChart}>
          <Typography variant="h6" noWrap>
            MonthlyChart
          </Typography>
          {targetAnswer ? (
            <RadarChart data={targetAnswer.answer} />
          ) : (
            <Progress />
          )}
        </div>
      </Paper>
      <Paper elevation={5}>
        <div className={classes.graphChart}>
          <Typography variant="h6" noWrap>
            HistoryChart
          </Typography>
          <HistoryChart
            xDataKey={xDataKey}
            // @ts-ignore
            data={dataForHistory}
            yDataKeys={yDataKeys}
          />
        </div>
      </Paper>
    </>
  );
};

export default memo(PrivateMap);
