import React, { memo } from "react";
import { makeStyles, createStyles } from "@material-ui/core";
import { Question } from "types/workSheet";
import DeletableTextField from "./DeletableTextField";

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
    questionId: string
  ) => (event: React.ChangeEvent<HTMLInputElement>) => void;
  addNewTextField?: () => void;
  removeTextField: (questionId: string) => () => void;
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
      {questions.map(({ id, value }, i) => {
        const l = i === 0 ? label : "";
        const handleFocus =
          i === questions.length - 1 ? addNewTextField : undefined;
        const deletable = questions.length > 1 && i < questions.length - 1;

        return (
          <div key={id} className={classes.root}>
            <div className={classes.textField}>
              <DeletableTextField
                id={id}
                label={l}
                value={value}
                placeholder="入力してください"
                handleChange={handleChangeExsingText(id)}
                handleDelete={removeTextField(id)}
                handleFocus={handleFocus}
                deletable={deletable}
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
