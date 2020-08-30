import React, { memo, useMemo, useCallback } from "react";
import { makeStyles, createStyles, Paper } from "@material-ui/core";
import HeaderChips from "components/common/molecules/HeaderChips";
import { PrimaryButton } from "components/common/atoms/Buttons";
import IconButton from "components/common/atoms/IconButton";
import useDialog from "hooks/useDialog";
import TextFieldList from "../molecules/TextFieldList";
import EditCategoriesDailog from "../molecules/EditCategoriesDailog";
import { WorksheetWithFilter } from "../type";

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
    chip: {
      margin: "0 1vw",
    },
    questions: {
      display: "flex",
      flexDirection: "column",
    },
    labelGroup: {
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
  editQuestion: (
    categoryId: string
  ) => (questionId: string) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  addNewQuestion: (categoryId: string) => () => void;
  removeQuestion: (categoryId: string) => (questionId: string) => () => void;
  updateWorksheetDoc: (worksheetWithFilter: WorksheetWithFilter) => () => void;
  updateWorksheetState: (worksheetWithFilter: WorksheetWithFilter) => void;
};

const Manage: React.FC<Props> = ({
  worksheetWithFilter,
  filterCategory,
  editQuestion,
  addNewQuestion,
  removeQuestion,
  updateWorksheetDoc,
  updateWorksheetState,
}) => {
  const classes = useStyles();
  const [open, handleDialog] = useDialog();

  const openDialog = useCallback(() => {
    handleDialog(true);
  }, [handleDialog]);

  const closeDialog = useCallback(
    (ws: WorksheetWithFilter) => () => {
      const next = ws.filter((e) => e.name !== "");
      updateWorksheetState(next);
      handleDialog(false);
    },
    [updateWorksheetState, handleDialog]
  );

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
        <IconButton
          iconName="add"
          label="add"
          size="small"
          onClick={openDialog}
        />
      </div>
      <section className={classes.questions}>
        {worksheetWithFilter.map(({ id, name, questions, filtered }) => {
          return filtered ? null : (
            <div key={id} className={classes.labelGroup}>
              <TextFieldList
                label={name}
                questions={questions}
                handleChangeExsingText={editQuestion(id)}
                addNewTextField={addNewQuestion(id)}
                removeTextField={removeQuestion(id)}
              />
            </div>
          );
        })}
      </section>
      <div className={classes.submitButton}>
        <PrimaryButton
          text="この内容で更新する"
          onClick={updateWorksheetDoc(worksheetWithFilter)}
        />
      </div>
      <EditCategoriesDailog
        worksheet={worksheetWithFilter}
        open={open}
        handleClose={closeDialog}
      />
    </Paper>
  );
};

export default memo(Manage);
