import BaseIconButton from "@material-ui/core/IconButton";
import React, { FC, memo } from "react";
import Icon, { IconName } from "components/common/atoms/Icon";
import { makeStyles, createStyles } from "@material-ui/core";
import clsx from "clsx";

type props = {
  label: string;
  disabled?: boolean;
  size?: "small" | "large";
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  iconName: IconName;
  className?: string;
};

const useStyles = makeStyles(() =>
  createStyles({
    icon: {
      padding: 0,
    },
  })
);

const IconButton: FC<props> = ({
  label,
  disabled = false,
  iconName,
  size,
  onClick,
  className,
}) => {
  const classes = useStyles();

  return (
    <BaseIconButton
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className={clsx(classes.icon, className)}
    >
      <Icon name={iconName} size={size} />
    </BaseIconButton>
  );
};

export default memo(IconButton);
