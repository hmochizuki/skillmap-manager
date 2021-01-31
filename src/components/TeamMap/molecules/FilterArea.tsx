import { Box, Typography } from "@material-ui/core";
import Checkbox from "components/common/atoms/Checkbox";
import React, { FC, memo } from "react";

export type Filter = { id: string; name: string; hide: boolean }[];

type Props = {
  title: string;
  items: Filter;
  handleItemClick: (
    id: string
  ) => (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

const FilterArea: FC<Props> = ({ title, items, handleItemClick }) => {
  return (
    <Box>
      <Typography variant="h6">{title}</Typography>
      {items.map((item) => (
        <Checkbox
          key={item.id}
          id={item.id}
          label={item.name}
          checked={!item.hide}
          onClick={handleItemClick(item.id)}
        />
      ))}
    </Box>
  );
};

export default memo(FilterArea);
