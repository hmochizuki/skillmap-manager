import React, { memo, useMemo } from "react";
import { makeStyles, createStyles, Paper, InputLabel } from "@material-ui/core";
import HeaderChips from "components/common/molecules/HeaderChips";
import Checkbox from "components/common/atoms/Checkbox";
import { WorksheetWithFilter } from "components/WorksheetManagement/type";
import { PrimaryButton } from "components/common/atoms/Buttons";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      padding: "2vh 2vw",
      minWidth: "500px",
    },
    chips: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
      marginBottom: "3vh",
    },
    questions: {
      display: "flex",
      flexWrap: "wrap",
    },
    labelGroup: {
      display: "block",
      padding: "0 2vw",
      marginBottom: "2vh",
    },
    submitButton: {
      display: "flex",
      justifyContent: "flex-end",
    },
  })
);

type Props = {
  worksheetWithFilter: WorksheetWithFilter;
  filterCategory: (id: string) => () => void;
  checkQuestion: (categoryId: string) => (questionId: string) => () => void;
  updateAnswerDocument: (
    worksheetWithFilter: WorksheetWithFilter
  ) => () => void;
};

const Answer: React.FC<Props> = ({
  worksheetWithFilter,
  filterCategory,
  checkQuestion,
  updateAnswerDocument,
}) => {
  const classes = useStyles();
  const chips = useMemo(
    () =>
      worksheetWithFilter.map(({ id, name, filtered }) => ({
        label: name,
        filtered,
        handleClick: filterCategory(id),
      })),
    [worksheetWithFilter, filterCategory]
  );

  return (
    <Paper elevation={5} className={classes.root}>
      <div className={classes.chips}>
        <HeaderChips chips={chips} />
      </div>
      <section>
        {worksheetWithFilter.map(({ id, name, questions, filtered }) => {
          return filtered ? null : (
            <div key={id} className={classes.labelGroup}>
              {questions.map((q, i) => (
                <div key={q.id}>
                  {i === 0 && <InputLabel shrink>{name}</InputLabel>}
                  <Checkbox
                    id={q.id}
                    checked={q.checked}
                    label={q.value}
                    onClick={checkQuestion(id)(q.id)}
                    size="small"
                  />
                </div>
              ))}
            </div>
          );
        })}
        <div className={classes.submitButton}>
          <PrimaryButton
            text="この内容で更新する"
            onClick={updateAnswerDocument(worksheetWithFilter)}
          />
        </div>
      </section>
    </Paper>
  );
};

export default memo(Answer);
