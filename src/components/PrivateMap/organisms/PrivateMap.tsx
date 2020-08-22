import React, { memo } from "react";
import { Typography, makeStyles, createStyles } from "@material-ui/core";
import PageTitle from "components/common/atoms/PageTitle";
import RadarChart from "../molecules/RadarChart";
import HistoryChart from "../molecules/HistoryChart";

const data = [
  {
    label: "React",
    point: 75,
  },
  {
    label: "Redux",
    point: 75,
  },
  {
    label: "Others",
    point: 75,
  },
];

const useStyles = makeStyles(() =>
  createStyles({
    graphChart: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
  })
);

const PrivateMap = () => {
  const classes = useStyles();

  return (
    <div>
      <PageTitle iconName="mySkillmap" title="Your Skillmap!!" />
      <div className={classes.graphChart}>
        <Typography variant="h6" noWrap>
          Your Skills
        </Typography>
        <RadarChart data={data} />
      </div>
      <div className={classes.graphChart}>
        <Typography variant="h6" noWrap>
          HistoryChart
        </Typography>
        <HistoryChart />
      </div>
    </div>
  );
};

export default memo(PrivateMap);
