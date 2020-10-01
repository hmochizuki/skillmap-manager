import React, { memo, FC } from "react";
import { Typography, makeStyles, createStyles, Paper } from "@material-ui/core";
import PageTitle from "components/common/atoms/PageTitle";
import {
  purple,
  blue,
  red,
  orange,
  green,
  pink,
  teal,
  indigo,
} from "@material-ui/core/colors";
import IconButton from "components/common/atoms/IconButton";
import {
  ScatterChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ZAxis,
  Legend,
  Scatter,
} from "recharts";
import { FULL_SCORE } from "config/business";

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

type Axis = {
  key: string;
  label: string;
};

type Props = {
  axis: {
    x: Axis;
    y: Axis;
    z: Axis;
  };
  data: Record<"category", number | string>[];
};

const colors = [
  purple[500],
  blue[500],
  red[500],
  orange[500],
  teal[500],
  green[500],
  pink[500],
  indigo[500],
];

const TeamMap: FC<Props> = ({ data, axis: { x, y, z } }) => {
  const classes = useStyles();

  return (
    <>
      <PageTitle iconName="mySkillmap" className={classes.title}>
        Team Skillmap!!
      </PageTitle>
      <Paper elevation={5} className={classes.paper}>
        <div className={classes.graphChart}>
          <Typography variant="h6" noWrap>
            <IconButton iconName="leftClose" onClick={() => {}} />
            MonthlyChart[2020/09]
            <IconButton iconName="rightClose" onClick={() => {}} />
          </Typography>

          <ScatterChart
            width={730}
            height={250}
            margin={{ top: 20, right: 20, bottom: 10, left: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              type="number"
              dataKey={x.key}
              name={x.label}
              domain={[0, FULL_SCORE]}
              label={{ value: x.label, position: "insideBottom" }}
            />
            <YAxis
              type="number"
              dataKey={y.key}
              name={y.label}
              domain={[0, "dataMax"]}
              label={{ value: y.label, position: "insideLeft" }}
            />
            <ZAxis
              type="number"
              dataKey={z.key}
              name={z.label}
              range={[100, 1000]}
            />
            <Legend />
            {data.map((d, i) => (
              <Scatter
                key={d.category}
                name={d.category}
                data={[d]}
                fill={colors[i]}
              />
            ))}
          </ScatterChart>
        </div>
      </Paper>
    </>
  );
};

export default memo(TeamMap);
