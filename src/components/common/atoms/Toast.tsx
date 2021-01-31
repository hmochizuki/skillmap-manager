import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React, { FC, useState } from "react";

type Props = {
  message: string;
  severity: "info" | "success" | "error";
};

const Toast: FC<Props> = ({ message, severity }) => {
  const [open, setOpen] = useState(true);

  return (
    <Snackbar
      open={open}
      anchorOrigin={{ horizontal: "right", vertical: "top" }}
      autoHideDuration={5000}
      onClose={() => setOpen(false)}
    >
      <Alert severity={severity}>{message}</Alert>
    </Snackbar>
  );
};

export default Toast;
