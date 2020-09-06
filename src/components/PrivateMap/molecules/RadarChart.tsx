import React, { memo } from "react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";

type Props = {
  // data: Array<Record<string, string | number>>;
  data: any;
  angleAxisKey: string;
  radarDataKey: string;
};

const Manage: React.FC<Props> = ({ data, angleAxisKey, radarDataKey }) => {
  return (
    <ResponsiveContainer width={730} height={250}>
      <RadarChart outerRadius={90} data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey={angleAxisKey} />
        <PolarRadiusAxis angle={90} domain={[0, 100]} />
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

export default memo(Manage);
