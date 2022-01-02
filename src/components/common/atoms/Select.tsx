import React, { FC, memo } from "react";
import { Select as BaseSelect, SelectProps } from "@material-ui/core";

type Props = SelectProps;

const Select: FC<Props> = (props) => {
  return <BaseSelect {...props} />;
};

export default memo(Select);
