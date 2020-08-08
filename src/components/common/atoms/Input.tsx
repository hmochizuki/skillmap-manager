import React, { FC, memo } from "react";
import { Input as BaseInput } from "@material-ui/core";

type props = {
  id: string;
  placeholder?: string;
  defaultValue?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  error?: boolean;
};

const Input: FC<props> = ({
  id,
  placeholder,
  defaultValue,
  disabled = false,
  fullWidth = false,
  error = false,
}) => {
  return (
    <BaseInput
      id={id}
      placeholder={placeholder}
      defaultValue={defaultValue}
      disabled={disabled}
      fullWidth={fullWidth}
      error={error}
    />
  );
};

export default memo(Input);
