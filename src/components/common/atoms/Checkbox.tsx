import React, { FC, memo } from "react";
import { Checkbox as BaseCheckbox, FormControlLabel } from "@material-ui/core";

type props = {
  name: string;
  checked: boolean;
  label: string;
  onClick: () => void;
};

const Checkbox: FC<props> = ({ name, checked, label, onClick }) => {
  return (
    <FormControlLabel
      control={
        <BaseCheckbox
          name={name}
          checked={checked}
          color="primary"
          onClick={onClick}
        />
      }
      label={label}
    />
  );
};

export default memo(Checkbox);
