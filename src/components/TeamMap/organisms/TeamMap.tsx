import React, { memo, FC } from "react";
import {
  Typography,
  makeStyles,
  createStyles,
  Paper,
  Box,
} from "@material-ui/core";
import PageTitle from "components/common/atoms/PageTitle";
import IconButton from "components/common/atoms/IconButton";
import { getYearMonth } from "util/getYearMonth";
import Checkbox from "components/common/atoms/Checkbox";
import ScatterChart from "../molecules/ScatterChart";

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

const axis = {
  x: {
    key: "average",
    label: "平均",
  },
  y: {
    key: "deviation",
    label: "標準偏差",
  },
  z: {
    key: "total",
    label: "総計",
  },
};

type Axis = {
  key: string;
  label: string;
};

type Props = {
  data: Record<"category", number | string>[];
  yearMonth: string;
  setYearMonth: (ym: string) => void;
  categoryFilter: { id: string; name: string; filtered: boolean }[];
  filterCategory: (categoryId: string) => () => void;
};

const TeamMap: FC<Props> = ({
  data,
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
          <ScatterChart data={data} axis={axis} />
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
