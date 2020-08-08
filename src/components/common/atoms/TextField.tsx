import React, { FC, memo } from "react";
import { TextField as BaseTextField } from "@material-ui/core";

type props = {
  id: string;
  label?: string;
  defaultValue?: string;
  placeholder?: string;
  helperText?: string;
  fullWidth: boolean;
  error?: boolean;
};

const TextField: FC<props> = ({
  id,
  label,
  defaultValue,
  placeholder,
  helperText,
  fullWidth,
  error = false,
}) => {
  return (
    <BaseTextField
      id={id}
      label={label}
      defaultValue={defaultValue}
      placeholder={placeholder}
      helperText={helperText}
      InputLabelProps={{
        shrink: true,
      }}
      fullWidth={fullWidth}
      error={error}
    />
  );
};

export default memo(TextField);
