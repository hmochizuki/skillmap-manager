import React, { memo } from "react";
import { makeStyles, createStyles } from "@material-ui/core";
import TextField from "components/common/atoms/TextField";

const useStyles = makeStyles(() =>
  createStyles({
    text: {
      width: "40vw",
      marginBottom: "1vh",
    },
  })
);

type Props = {
  label: string;
  values: string[];
  handleChangeExsingText: (
    index: number
  ) => (event: React.ChangeEvent<HTMLInputElement>) => void;
  addNewTextField: () => void;
};

const TextFieldList: React.FC<Props> = ({
  label,
  values,
  handleChangeExsingText,
  addNewTextField,
}) => {
  const classes = useStyles();

  return (
    <>
      {values.map((value, i) => {
        const l = i === 0 ? label : "";
        const onFocus = i === values.length - 1 ? addNewTextField : undefined;

        return (
          // eslint-disable-next-line react/no-array-index-key
          <div key={`${label}_${i}`}>
            <div className={classes.text}>
              <TextField
                id={`${label}_${i}`}
                name={`${label}_${i}`}
                label={l}
                value={value}
                placeholder="入力してください"
                handleChange={handleChangeExsingText(i)}
                onFocus={onFocus}
                fullWidth
              />
            </div>
          </div>
        );
      })}
    </>
  );
};

export default memo(TextFieldList);
