import React, { FC, memo } from "react";
import { TextField as BaseTextField } from "@material-ui/core";

type props = {
  id: string;
  label: string;
  defaultValue?: string;
  helperText?: string;
  error?: boolean;
};

const TextField: FC<props> = ({
  id,
  label,
  defaultValue,
  helperText,
  error = false,
}) => {
  return (
    <BaseTextField
      id={id}
      label={label}
      defaultValue={defaultValue}
      helperText={helperText}
      error={error}
    />
  );
};

export default memo(TextField);
