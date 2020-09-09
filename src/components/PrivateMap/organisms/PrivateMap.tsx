import React, { memo, FC } from "react";
import { Typography, makeStyles, createStyles, Paper } from "@material-ui/core";
import PageTitle from "components/common/atoms/PageTitle";
import { AnsweredWorksheet } from "firestore/types/Answer";
import IconButton from "components/common/atoms/IconButton";
import { getYearMonth } from "util/getYearMonth";
import RadarChart from "../molecules/RadarChart";
import HistoryChart from "../molecules/HistoryChart";

const useStyles = makeStyles(() =>
  createStyles({
    title: {
      marginBottom: "1vh",
    },
    paper: {
      marginBottom: "3vh",
      padding: "10px",
    },
    graphChart: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
  })
);

type Props = {
  dataForHistory: Array<Record<string, number | string>>;
  dataForMonthly: AnsweredWorksheet;
  categoris: string[];
  targetYearMonth: string;
  setTargetYearMonth: (ym: string) => void;
};

const PrivateMap: FC<Props> = ({
  dataForHistory,
  dataForMonthly,
  categoris,
  targetYearMonth,
  setTargetYearMonth,
}) => {
  const classes = useStyles();
  const xDataKey = "yearMonth";
  const changeTargetYeahMonth = (addMonth: number) => () => {
    const d = targetYearMonth.split("-").map((e) => parseInt(e, 10));
    // @ts-ignore
    const prev = new Date(d[0], (d[1] - 1).toString().padStart(2, "0"));
    prev.setMonth(prev.getMonth() + addMonth);
    setTargetYearMonth(getYearMonth(prev));
  };

  return (
    <>
      <PageTitle iconName="mySkillmap" className={classes.title}>
        自分のスキルを分析する
      </PageTitle>
      <Paper elevation={5} className={classes.paper}>
        <div className={classes.graphChart}>
          <Typography variant="h6" noWrap>
            <IconButton
              iconName="leftClose"
              onClick={changeTargetYeahMonth(-1)}
            />
            MonthlyChart[{targetYearMonth}]
            <IconButton
              iconName="rightClose"
              onClick={changeTargetYeahMonth(1)}
            />
          </Typography>
          <RadarChart
            data={dataForMonthly}
            angleAxisKey="name"
            radarDataKey="point"
          />
        </div>
      </Paper>
      <Paper elevation={5} className={classes.paper}>
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
