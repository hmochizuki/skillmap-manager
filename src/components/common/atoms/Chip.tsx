import React, { memo } from "react";
import BaseChip from "@material-ui/core/Chip";

type Props = {
  label: string;
  size: "medium" | "small";
  variant?: "default" | "outlined";
  handleClick?: () => void;
};

const Chip: React.FC<Props> = ({
  label,
  size,
  variant = "default",
  handleClick,
}) => {
  return (
    <BaseChip
      color="primary"
      variant={variant}
      size={size}
      label={label}
      onClick={handleClick}
    />
  );
};

export default memo(Chip);
