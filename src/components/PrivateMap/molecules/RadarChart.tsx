import React, { memo } from "react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";

type Props = {
  data: Array<{ label: string; point: number }>;
};

const Manage: React.FC<Props> = ({ data }) => {
  return (
    <RadarChart outerRadius={90} width={730} height={250} data={data}>
      <PolarGrid />
      <PolarAngleAxis dataKey="label" />
      <PolarRadiusAxis angle={90} domain={[0, 100]} />
      <Radar
        name="point"
        dataKey="point"
        stroke="#8884d8"
        fill="#8884d8"
        fillOpacity={0.6}
      />
    </RadarChart>
  );
};

export default memo(Manage);
