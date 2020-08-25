import React, { FC, memo } from "react";
import { TextField as BaseTextField } from "@material-ui/core";

type props = {
  id: string;
  name: string;
  value?: string;
  label?: string;
  defaultValue?: string;
  placeholder?: string;
  helperText?: string;
  fullWidth?: boolean;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  error?: boolean;
};

const TextField: FC<props> = ({
  id,
  name,
  value,
  label,
  defaultValue,
  placeholder,
  helperText,
  fullWidth,
  handleChange,
  onFocus,
  error = false,
}) => {
  return (
    <BaseTextField
      id={id}
      name={name}
      value={value}
      type="text"
      label={label}
      defaultValue={defaultValue}
      placeholder={placeholder}
      helperText={helperText}
      InputLabelProps={{
        shrink: true,
      }}
      onChange={handleChange}
      onFocus={onFocus}
      fullWidth={fullWidth}
      error={error}
    />
  );
};

export default memo(TextField);
