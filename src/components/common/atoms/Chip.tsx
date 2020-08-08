import React, { memo, useState, useCallback } from "react";
import BaseChip from "@material-ui/core/Chip";

type Variant = "default" | "outlined";

type Props = {
  label: string;
  size: "medium" | "small";
  variant: Variant;
  handleClick?: () => void;
};

const useChipClick = (defautlVariant: Variant, handleClick?: () => void) => {
  const [v, setV] = useState(defautlVariant);
  const handleClickWithSwaithVariant = useCallback(() => {
    if (handleClick) {
      setV(v === "default" ? "outlined" : "default");
      handleClick();
    }
  }, [v, handleClick]);

  return { v, handleClickWithSwaithVariant };
};

const Chip: React.FC<Props> = ({
  label,
  size,
  variant = "default",
  handleClick,
}) => {
  const { v, handleClickWithSwaithVariant } = useChipClick(
    variant,
    handleClick
  );

  return (
    <BaseChip
      color="primary"
      variant={v}
      size={size}
      label={label}
      onClick={handleClickWithSwaithVariant}
    />
  );
};

export default memo(Chip);
