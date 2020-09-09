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

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {};

const data01 = [
  {
    x: 50,
    y: 60,
    z: 200,
  },
];

const data02 = [
  {
    x: 30,
    y: 300,
    z: 400,
  },
];

const data03 = [
  {
    x: 75,
    y: 200,
    z: 350,
  },
];

const data04 = [
  {
    x: 30,
    y: 130,
    z: 120,
  },
];

const data05 = [
  {
    x: 10,
    y: 10,
    z: 120,
  },
];

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

const TeamMap: FC<Props> = ({}) => {
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
              dataKey="x"
              name="平均"
              domain={[0, 100]}
              label={{ value: "平均", position: "insideBottom" }}
            />
            <YAxis
              type="number"
              dataKey="y"
              name="分散"
              domain={[0, "dataMax"]}
              label={{ value: "分散", position: "insideLeft" }}
            />
            <ZAxis type="number" dataKey="z" name="score" range={[100, 1000]} />
            {/* <Tooltip /> */}
            <Legend />
            <Scatter name="React" data={data01} fill={colors[0]} />
            <Scatter name="Redux" data={data02} fill={colors[1]} />
            <Scatter name="Firebase" data={data03} fill={colors[2]} />
            <Scatter name="React-Native" data={data04} fill={colors[3]} />
            <Scatter name="Others" data={data05} fill={colors[4]} />
          </ScatterChart>
        </div>
      </Paper>
      {/* <Paper elevation={5} className={classes.paper}>
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
      </Paper> */}
    </>
  );
};

export default memo(TeamMap);
