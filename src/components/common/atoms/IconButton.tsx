import BaseIconButton from "@material-ui/core/IconButton";
import React, { FC, memo } from "react";
import Icon, { IconName } from "components/common/atoms/Icon";

type props = {
  label: string;
  disabled?: boolean;
  size?: "small" | "large";
  onClick: () => void;
  iconName: IconName;
};

const IconButton: FC<props> = ({
  label,
  disabled = false,
  iconName,
  size,
  onClick,
}) => {
  return (
    <BaseIconButton aria-label={label} disabled={disabled} onClick={onClick}>
      <Icon name={iconName} size={size} />
    </BaseIconButton>
  );
};

export default memo(IconButton);
