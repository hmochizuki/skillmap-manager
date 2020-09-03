import React, { FC, memo } from "react";
import { Checkbox as BaseCheckbox, FormControlLabel } from "@material-ui/core";

type props = {
  id: string;
  name?: string;
  checked?: boolean;
  label: string;
  size?: "small" | "medium";
  onClick: () => void;
};

const Checkbox: FC<props> = ({ id, name, checked, label, size, onClick }) => {
  return (
    <FormControlLabel
      control={
        <BaseCheckbox
          id={id}
          name={name}
          checked={checked}
          size={size}
          color="primary"
          onClick={onClick}
        />
      }
      label={label}
    />
  );
};

export default memo(Checkbox);
