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
  disabled?: boolean;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  error?: boolean;
  className?: string;
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
  disabled,
  handleChange,
  onFocus,
  onBlur,
  error = false,
  className,
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
      onBlur={onBlur}
      fullWidth={fullWidth}
      disabled={disabled}
      error={error}
      className={className}
    />
  );
};

export default memo(TextField);
