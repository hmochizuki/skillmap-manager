import React, { memo, FC } from "react";
import { makeStyles, createStyles } from "@material-ui/core";
import TextField from "components/common/atoms/TextField";
import IconButton from "components/common/atoms/IconButton";
import clsx from "clsx";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-end",
      // marginBottom: "1vh",
    },
    textField: {
      marginRight: "1vw",
    },
    hide: {
      display: "none",
    },
  })
);

type Props = {
  id: string;
  label?: string;
  placeholder?: string;
  value: string;
  deletable?: boolean;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDelete: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  handleFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  fullWidth?: boolean;
};

const DeletableTextField: FC<Props> = ({
  id,
  label,
  placeholder,
  value,
  deletable = true,
  handleChange,
  handleDelete,
  handleFocus,
  fullWidth,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <TextField
        id={id}
        label={label}
        placeholder={placeholder}
        value={value}
        handleChange={handleChange}
        className={classes.textField}
        onFocus={handleFocus}
        fullWidth={fullWidth}
      />
      <IconButton
        label={value}
        iconName="delete"
        onClick={handleDelete}
        className={clsx(deletable || classes.hide)}
      />
    </div>
  );
};

export default memo(DeletableTextField);
