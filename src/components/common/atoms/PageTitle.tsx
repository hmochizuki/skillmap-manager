import React, { FC, memo } from "react";
import { Typography } from "@material-ui/core";
import Icon, { IconName } from "./Icon";

type props = {
  iconName?: IconName;
  title: string;
};

const PageTitle: FC<props> = ({ iconName, title }) => {
  return (
    <Typography variant="h5" noWrap>
      {iconName && <Icon name={iconName} size="large" />}
      {title}
    </Typography>
  );
};

export default memo(PageTitle);
