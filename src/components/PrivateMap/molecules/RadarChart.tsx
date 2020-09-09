import React, { memo, FC } from "react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";
import { FULL_SCORE } from "config/business";

type Props = {
  data: Array<Record<string, string | number | any>>;
  angleAxisKey: string;
  radarDataKey: string;
};

const Manage: FC<Props> = ({ data, angleAxisKey, radarDataKey }) => {
  return (
    <ResponsiveContainer width={500} height={250}>
      <RadarChart outerRadius={90} data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey={angleAxisKey} />
        <PolarRadiusAxis angle={80} domain={[0, FULL_SCORE]} />
        <Radar
          name="private-map"
          dataKey={radarDataKey}
          stroke="#8884d8"
          fill="#8884d8"
          fillOpacity={0.6}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
};

export default memo<FC<Props>>(Manage);
