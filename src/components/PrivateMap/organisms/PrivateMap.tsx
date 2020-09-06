import React, { memo, FC } from "react";
import { Typography, makeStyles, createStyles, Paper } from "@material-ui/core";
import PageTitle from "components/common/atoms/PageTitle";
import { AnsweredWorksheet } from "firestore/types/Answer";
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
  dataForMonthly: AnsweredWorksheet;
  categoris: string[];
};

const PrivateMap: FC<Props> = ({
  dataForHistory,
  dataForMonthly,
  categoris,
}) => {
  const classes = useStyles();
  const xDataKey = "yearMonth";

  return (
    <>
      <PageTitle iconName="mySkillmap">Your Skillmap!!</PageTitle>
      <Paper elevation={5}>
        <div className={classes.graphChart}>
          <Typography variant="h6" noWrap>
            MonthlyChart
          </Typography>
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
            yDataKeys={categoris}
          />
        </div>
      </Paper>
    </>
  );
};

export default memo(PrivateMap);
