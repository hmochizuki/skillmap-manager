import React, { memo } from "react";
import { makeStyles, createStyles } from "@material-ui/core";
import TextField from "components/common/atoms/TextField";
import IconButton from "components/common/atoms/IconButton";
import { Question } from "types/workSheet";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: "flex",
      alignItems: "center",
    },
    textField: {
      marginRight: "1vw",
      marginBottom: "1vh",
      width: "100%",
    },
  })
);

type Props = {
  label: string;
  questions: Question[];
  handleChangeExsingText: (
    index: number
  ) => (event: React.ChangeEvent<HTMLInputElement>) => void;
  addNewTextField?: () => void;
  removeTextField: (index: number) => () => void;
};

const TextFieldList: React.FC<Props> = ({
  label,
  questions,
  handleChangeExsingText,
  addNewTextField,
  removeTextField,
}) => {
  const classes = useStyles();

  return (
    <>
      {questions.map(({ value }, i) => {
        const l = i === 0 ? label : "";
        const onFocus =
          i === questions.length - 1 ? addNewTextField : undefined;
        const showRemoveIcon = questions.length > 1 && i < questions.length - 1;

        return (
          // eslint-disable-next-line react/no-array-index-key
          <div key={`${label}_${i}`} className={classes.root}>
            <div className={classes.textField}>
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
            {showRemoveIcon ? (
              <IconButton
                iconName="delete"
                label="delete worksheet"
                onClick={removeTextField(i)}
              />
            ) : null}
          </div>
        );
      })}
    </>
  );
};

export default memo(TextFieldList);
