import React, { memo, FC } from "react";
import BaseDialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { SecondaryButton, PrimaryButton } from "../atoms/Buttons";

type Props = {
  id: string;
  title: string;
  buttomLabel?: string;
  open: boolean;
  handleClose: () => void;
};

const Dialog: FC<Props> = ({
  id,
  title,
  buttomLabel,
  children,
  open,
  handleClose,
}) => {
  return (
    <div>
      <BaseDialog open={open} onClose={handleClose} aria-labelledby={id}>
        <DialogTitle id={id}>{title}</DialogTitle>
        <DialogContent>{children}</DialogContent>
        <DialogActions>
          <SecondaryButton onClick={handleClose} text="閉じる" />
          {buttomLabel ? (
            <PrimaryButton onClick={handleClose} text={buttomLabel} />
          ) : null}
        </DialogActions>
      </BaseDialog>
    </div>
  );
};

export default memo(Dialog);
