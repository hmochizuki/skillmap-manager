import React, { memo, FC } from "react";
import {
  Typography,
  makeStyles,
  createStyles,
  Paper,
  MenuItem,
  Box,
} from "@material-ui/core";
import PageTitle from "components/common/atoms/PageTitle";
import IconButton from "components/common/atoms/IconButton";
import Select from "components/common/atoms/Select";
import { getYearMonth } from "util/getYearMonth";
import { Score } from "firestore/types/Skillmap";
import Icon from "components/common/atoms/Icon";
import { PrimaryButton } from "components/common/atoms/Buttons";
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
    graphTitle: {
      textAlign: "center",
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
type HistoryData = (Record<string, number> & {
  yearMonth: string;
  answeredUsers: { id: string; name: string }[];
})[];

type Period = {
  start: string; // YYYY-mm
  end: string; // YYYY-mm
};

export type Props = {
  monthlyData: Score[] | null;
  historyData: HistoryData;
  selectedHistoryChartType: HistoryChartType;
  selectedYearMonth: string;
  setSelectedYearMonth: (ym: string) => void;
  changeHistoryChartType: (
    event: React.ChangeEvent<{ value: HistoryChartType }>
  ) => void;
  categoriesFilter: Filter;
  filterCategory: (categoryId: string) => () => void;
  userFilter: Filter;
  filterUser: (id: string) => () => void;
  initUserFilter: (ids: string[]) => void;
  historyCartPeriod: Period;
  onChangeHistoryCartPeriod: (
    target: "start" | "end"
  ) => (event: React.ChangeEvent<{ value: string }>) => void;
  historyDataWithinDisplayPeriod: HistoryData;
};

const TeamMap: FC<Props> = ({
  monthlyData, // 不要。カテゴリー・ユーザでフィルター済みのデータに変更する
  historyData,
  selectedHistoryChartType,
  selectedYearMonth,
  setSelectedYearMonth,
  changeHistoryChartType,
  categoriesFilter,
  filterCategory,
  userFilter,
  filterUser,
  initUserFilter,
  historyCartPeriod,
  onChangeHistoryCartPeriod,
  historyDataWithinDisplayPeriod,
}) => {
  const classes = useStyles();

  const changeTargetYeahMonth = (addMonth: number) => () => {
    const d = selectedYearMonth.split("-").map((e) => parseInt(e, 10));
    // @ts-ignore
    const prev = new Date(d[0], (d[1] - 1).toString().padStart(2, "0"));
    prev.setMonth(prev.getMonth() + addMonth);
    setSelectedYearMonth(getYearMonth(prev));
  };

  const yLabel = selectedHistoryChartType === "average" ? "平均値" : "標準偏差";
  const startData = historyData.find(
    (data) => data.yearMonth === historyCartPeriod.start
  );
  const endData = historyData.find(
    (data) => data.yearMonth === historyCartPeriod.end
  );
  const trendData = categoriesFilter
    .filter(({ hide }) => !hide)
    .map(({ id, name }) => {
      return {
        id,
        name,
        start: startData ? Math.floor(startData[id] * 10) / 10 : 0,
        end: endData ? Math.floor(endData[id] * 10) / 10 : 0,
      };
    });

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
            MonthlyChart[{selectedYearMonth}]
            <IconButton
              iconName="rightClose"
              onClick={changeTargetYeahMonth(1)}
            />
          </Typography>
          <ScatterChart dataKey="category" data={monthlyData} axis={axis} />
        </div>
        <Box display="flex">
          <div className={classes.graphWrapper}>
            <p className={classes.graphTitle}>
              <Typography variant="h6" noWrap>
                HistoryChart
              </Typography>
              <Select
                id="history-chart-type-select"
                value={selectedHistoryChartType}
                label="縦軸"
                // @ts-ignore
                onChange={changeHistoryChartType}
              >
                <MenuItem value="average">平均値</MenuItem>
                <MenuItem value="deviation">標準偏差</MenuItem>
              </Select>
              <Select
                id="history-chart-yyyymm-start"
                value={historyCartPeriod.start}
                labelId="history-chart-yyyymm-start-label"
                label="開始月"
                // @ts-ignore
                onChange={onChangeHistoryCartPeriod("start")}
              >
                {/* reverse は元の配列の参照を返す(不変性を破壊する)ため、スプレッドしてから reverse する */}
                {[...historyData].reverse().map((e) => (
                  <MenuItem
                    key={e.yearMonth}
                    value={e.yearMonth}
                    disabled={
                      new Date(e.yearMonth) > new Date(historyCartPeriod.end)
                    }
                  >
                    {e.yearMonth}
                  </MenuItem>
                ))}
              </Select>
              <Select
                id="history-chart-yyyymm-end"
                value={historyCartPeriod.end}
                label="終了月"
                // @ts-ignore
                onChange={onChangeHistoryCartPeriod("end")}
              >
                {[...historyData].reverse().map((e) => (
                  <MenuItem
                    key={e.yearMonth}
                    value={e.yearMonth}
                    disabled={
                      new Date(e.yearMonth) < new Date(historyCartPeriod.start)
                    }
                  >
                    {e.yearMonth}
                  </MenuItem>
                ))}
              </Select>
            </p>
            <HistoryChart
              xDataKey="yearMonth"
              yLabel={yLabel}
              data={historyDataWithinDisplayPeriod}
              categoriesFilter={categoriesFilter}
            />
          </div>
          <div className={classes.graphWrapper}>
            <table>
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Diff</th>
                  <th>Icon</th>
                </tr>
              </thead>
              <tbody>
                {trendData.map(({ id, name, start, end }) => {
                  return (
                    <tr key={id}>
                      <td>{name}</td>
                      <td>{Math.floor((end - start) * 10) / 10}</td>
                      <td>
                        {end - start === 0 ? (
                          <Icon name="trendingFlat" size="small" />
                        ) : end - start > 0 ? (
                          <Icon name="trendingUp" size="small" />
                        ) : (
                          <Icon name="trendingDown" size="small" />
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Box>
        <PrimaryButton
          text="表示期間に全て回答しているユーザのみにフィルターする"
          onClick={() => {
            const answeredUsers = historyDataWithinDisplayPeriod.map((d) =>
              d.answeredUsers.map(({ id }) => id)
            );

            const answeredUserIds = answeredUsers.reduce((pre, cur) => {
              const next = cur.filter((id) => pre.includes(id));

              return next;
            }, answeredUsers[0]);

            initUserFilter(answeredUserIds);
          }}
        />
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
