import { Button as BaseButton } from "@material-ui/core";
import React, { FC, memo } from "react";

type props = {
  text: string;
  disabled?: boolean;
  onClick: () => void;
};

const Primary: FC<props> = ({ text, disabled = false, onClick }) => {
  return (
    <BaseButton
      variant="contained"
      color="primary"
      disabled={disabled}
      onClick={onClick}
    >
      {text}
    </BaseButton>
  );
};

const Secondary: FC<props> = ({ text, disabled = false, onClick }) => {
  return (
    <BaseButton
      variant="outlined"
      color="primary"
      disabled={disabled}
      onClick={onClick}
    >
      {text}
    </BaseButton>
  );
};

export const PrimaryButton = memo(Primary);
export const SecondaryButton = memo(Secondary);
