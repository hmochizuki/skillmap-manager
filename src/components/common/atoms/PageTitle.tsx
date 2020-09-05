import React, { FC, memo } from "react";
import { Typography } from "@material-ui/core";
import Icon, { IconName } from "./Icon";

type Props = {
  iconName?: IconName;
  className?: string;
};

const PageTitle: FC<Props> = ({ iconName, children, className }) => {
  return (
    <Typography variant="h5" noWrap className={className}>
      {iconName && <Icon name={iconName} />}
      {children}
    </Typography>
  );
};

export default memo<FC<Props>>(PageTitle);
