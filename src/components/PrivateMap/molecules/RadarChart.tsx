import React, { memo } from "react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";
import { Worksheet } from "firestore/types/Team";

type Props = {
  data: Required<Worksheet>;
};

const Manage: React.FC<Props> = ({ data }) => {
  return (
    <ResponsiveContainer width={730} height={250}>
      <RadarChart outerRadius={90} data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="name" />
        <PolarRadiusAxis angle={90} domain={[0, 100]} />
        <Radar
          name="private-map"
          dataKey="point"
          stroke="#8884d8"
          fill="#8884d8"
          fillOpacity={0.6}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
};

export default memo(Manage);
