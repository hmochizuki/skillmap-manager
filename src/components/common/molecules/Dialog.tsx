import React, { memo, FC } from "react";
import BaseDialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles, createStyles, DialogContentText } from "@material-ui/core";
import { SecondaryButton, PrimaryButton } from "../atoms/Buttons";

export type Props = {
  id: string;
  title: string;
  discription?: string;
  primaryButton?: {
    label: string;
    handleClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  };
  open: boolean;
  handleClose: () => void;
};

const useStyles = makeStyles(() =>
  createStyles({
    paper: {
      minWidth: "480px",
    },
  })
);

const Dialog: FC<Props> = ({
  id,
  title,
  discription,
  primaryButton,
  children,
  open,
  handleClose,
}) => {
  const classes = useStyles();

  return (
    <BaseDialog
      open={open}
      onClose={handleClose}
      aria-labelledby={id}
      classes={{ paper: classes.paper }}
    >
      <DialogTitle id={id}>{title}</DialogTitle>
      <DialogContent>
        {discription && <DialogContentText>{discription}</DialogContentText>}
        {children}
      </DialogContent>
      <DialogActions>
        <SecondaryButton onClick={handleClose} text="閉じる" />
        {primaryButton ? (
          <PrimaryButton
            onClick={primaryButton.handleClick}
            text={primaryButton.label}
          />
        ) : null}
      </DialogActions>
    </BaseDialog>
  );
};

export default memo(Dialog);
