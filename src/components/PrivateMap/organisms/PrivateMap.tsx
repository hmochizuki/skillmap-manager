import React, { memo, FC } from "react";
import { Typography, makeStyles, createStyles, Paper } from "@material-ui/core";
import PageTitle from "components/common/atoms/PageTitle";
import { AnswerDocument } from "firestore/types/Answer";
import { Worksheet } from "firestore/types/Team";
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
  dataForHistory: Array<Record<string, number> & Record<"yearMonth", string>>;
  dataForMonthly: Required<Worksheet>;
  categoris?: string[];
  answers: AnswerDocument[];
};

const PrivateMap: FC<Props> = ({ dataForHistory, dataForMonthly, answers }) => {
  const classes = useStyles();
  const xDataKey = "yearMonth";

  const getCategoryNames = (answerDoc: AnswerDocument): string[] => {
    // @ts-ignore
    return answerDoc.answer.reduce((acc, category) => {
      return [...acc, category.name];
    }, []);
  };

  // @ts-ignore
  const yDataKeys: string[] = getCategoryNames(answers[answers.length - 1]);

  return (
    <>
      <PageTitle iconName="mySkillmap">Your Skillmap!!</PageTitle>
      <Paper elevation={5}>
        <div className={classes.graphChart}>
          <Typography variant="h6" noWrap>
            MonthlyChart
          </Typography>
          {/*
          @ts-ignore */}
          <RadarChart
            data={dataForMonthly}
            angleAxisKey="name"
            radarDataKey="point"
          />
        </div>
      </Paper>
      <Paper elevation={5}>
        <div className={classes.graphChart}>
          <Typography variant="h6" noWrap>
            HistoryChart
          </Typography>
          <HistoryChart
            xDataKey={xDataKey}
            data={dataForHistory}
            yDataKeys={yDataKeys}
          />
        </div>
      </Paper>
    </>
  );
};

export default memo(PrivateMap);
