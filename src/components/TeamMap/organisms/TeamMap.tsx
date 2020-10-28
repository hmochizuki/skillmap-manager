import React, { memo, FC } from "react";
import {
  Typography,
  makeStyles,
  createStyles,
  Paper,
  Box,
} from "@material-ui/core";
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
  LabelList,
} from "recharts";
import { FULL_SCORE } from "config/business";
import { getYearMonth } from "util/getYearMonth";
import Checkbox from "components/common/atoms/Checkbox";

const colors = [
  purple[500],
  blue[500],
  red[500],
  orange[500],
  teal[500],
  green[500],
  pink[500],
  indigo[500],
  purple[200],
  blue[200],
  red[200],
  orange[200],
  teal[200],
  green[200],
  pink[200],
  indigo[200],
];

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
  yearMonth: string;
  setYearMonth: (ym: string) => void;
  categoryFilter: { id: string; name: string; filtered: boolean }[];
  filterCategory: (categoryId: string) => () => void;
};

const TeamMap: FC<Props> = ({
  data,
  axis: { x, y, z },
  yearMonth,
  setYearMonth,
  categoryFilter,
  filterCategory,
}) => {
  const classes = useStyles();

  const changeTargetYeahMonth = (addMonth: number) => () => {
    const d = yearMonth.split("-").map((e) => parseInt(e, 10));
    // @ts-ignore
    const prev = new Date(d[0], (d[1] - 1).toString().padStart(2, "0"));
    prev.setMonth(prev.getMonth() + addMonth);
    setYearMonth(getYearMonth(prev));
  };

  return (
    <>
      <PageTitle iconName="mySkillmap" className={classes.title}>
        Team Skillmap!!
      </PageTitle>
      <Paper elevation={5} className={classes.paper}>
        <div className={classes.graphChart}>
          <Typography variant="h6" noWrap>
            <IconButton
              iconName="leftClose"
              onClick={changeTargetYeahMonth(-1)}
            />
            MonthlyChart[{yearMonth}]
            <IconButton
              iconName="rightClose"
              onClick={changeTargetYeahMonth(1)}
            />
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
              >
                <LabelList dataKey="category" position="top" />
              </Scatter>
            ))}
          </ScatterChart>
        </div>
        <Box>
          <Typography>User Filter</Typography>

          <Checkbox id="aaa" label="hogehoge" onClick={() => {}} />
          <Checkbox id="bbb" label="pekepek" onClick={() => {}} />
        </Box>
        <Box>
          <Typography>Category Filter</Typography>
          {categoryFilter.map((category) => (
            <Checkbox
              key={category.id}
              id={category.id}
              label={category.name}
              onClick={filterCategory(category.id)}
            />
          ))}
        </Box>
      </Paper>
    </>
  );
};

export default memo(TeamMap);
