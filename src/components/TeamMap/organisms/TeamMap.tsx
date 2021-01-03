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
import { Score } from "firestore/types/Skillmap";
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

type Props = {
  data: Score[] | null;
  yearMonth: string;
  setYearMonth: (ym: string) => void;
  categoriesFilter: { id: string; name: string; show: boolean }[];
  filterCategory: (categoryId: string) => () => void;
  userFilter: { id: string; name?: string; show: boolean }[]; // nameがオプショナルなのは過去のデータパターンに対する後方互換性の担保
  filterUser: (id: string) => () => void;
};

const TeamMap: FC<Props> = ({
  data,
  yearMonth,
  setYearMonth,
  categoriesFilter,
  filterCategory,
  userFilter,
  filterUser,
}) => {
  const classes = useStyles();

  const changeTargetYeahMonth = (addMonth: number) => () => {
    const d = yearMonth.split("-").map((e) => parseInt(e, 10));
    // @ts-ignore
    const prev = new Date(d[0], (d[1] - 1).toString().padStart(2, "0"));
    prev.setMonth(prev.getMonth() + addMonth);
    setYearMonth(getYearMonth(prev));
  };

  const dataFilteredByCategories = data
    ? data.map((d) => {
        const filter = categoriesFilter.find(({ id }) => id === d.categoryId);
        const show = filter ? filter.show : true;

        return { ...d, hide: !show };
      })
    : null;

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
            dataKey="category"
            data={dataFilteredByCategories}
            axis={axis}
          />
        </div>
        <Box>
          <Typography>User Filter</Typography>
          {userFilter.map((filter) => (
            <Checkbox
              key={filter.id}
              id={filter.id}
              label={filter.name || filter.id} // 過去のデータパターンに対する後方互換性の担保
              checked={filter.show}
              onClick={filterUser(filter.id)}
            />
          ))}
        </Box>
        <Box>
          <Typography>Category Filter</Typography>
          {categoriesFilter.map((filter) => (
            <Checkbox
              key={filter.id}
              id={filter.id}
              label={filter.name}
              checked={filter.show}
              onClick={filterCategory(filter.id)}
            />
          ))}
        </Box>
      </Paper>
    </>
  );
};

export default memo(TeamMap);
