import React, { memo, FC } from "react";
import {
  Typography,
  makeStyles,
  createStyles,
  Paper,
  Select,
  MenuItem,
} from "@material-ui/core";
import PageTitle from "components/common/atoms/PageTitle";
import IconButton from "components/common/atoms/IconButton";
import { getYearMonth } from "util/getYearMonth";
import { Score } from "firestore/types/Skillmap";
import HistoryChart from "../molecules/HistoryChart";
import ScatterChart from "../molecules/ScatterChart";
import FilterArea, { Filter } from "../molecules/FilterArea";

const useStyles = makeStyles(() =>
  createStyles({
    title: {
      marginBottom: "1vh",
    },
    paper: {
      marginBottom: "3vh",
      padding: "10px",
    },
    graphWrapper: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginBottom: "20px",
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

type HistoryChartType = "average" | "deviation";

type Props = {
  monthlyData: Score[] | null;
  historyData: Record<string, string | number>[];
  selectedHistoryChartType: HistoryChartType;
  yearMonth: string;
  setYearMonth: (ym: string) => void;
  changeHistoryChartType: (
    event: React.ChangeEvent<{ value: HistoryChartType }>
  ) => void;
  categoriesFilter: Filter;
  filterCategory: (categoryId: string) => () => void;
  userFilter: Filter;
  filterUser: (id: string) => () => void;
};

const TeamMap: FC<Props> = ({
  monthlyData,
  historyData,
  selectedHistoryChartType,
  yearMonth,
  setYearMonth,
  changeHistoryChartType,
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

  const filteredMonthlyData = monthlyData
    ? monthlyData.map((d) => {
        const filter = categoriesFilter.find(({ id }) => id === d.categoryId);
        const hide = filter ? filter.hide : true;

        return { ...d, hide };
      })
    : null;

  const yLabel = selectedHistoryChartType === "average" ? "平均値" : "標準偏差";

  return (
    <>
      <PageTitle iconName="mySkillmap" className={classes.title}>
        Team Skillmap!!
      </PageTitle>
      <Paper elevation={5} className={classes.paper}>
        <div className={classes.graphWrapper}>
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
            data={filteredMonthlyData}
            axis={axis}
          />
        </div>
        <div className={classes.graphWrapper}>
          <Typography variant="h6" noWrap>
            HistoryChart
            {/* TODO: 共通化 */}
            <Select
              id="history-chart-type-select"
              value={selectedHistoryChartType}
              // @ts-ignore
              onChange={changeHistoryChartType}
            >
              <MenuItem value="average">平均値</MenuItem>
              <MenuItem value="deviation">標準偏差</MenuItem>
            </Select>
          </Typography>
          <HistoryChart
            xDataKey="yearMonth"
            yLabel={yLabel}
            data={historyData}
            categoriesFilter={categoriesFilter}
          />
        </div>
        <FilterArea
          title="User Filter"
          items={userFilter}
          handleItemClick={filterUser}
        />
        <FilterArea
          title="Category Filter"
          items={categoriesFilter}
          handleItemClick={filterCategory}
        />
      </Paper>
    </>
  );
};

export default memo(TeamMap);
