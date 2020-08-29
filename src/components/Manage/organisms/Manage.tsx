import React, { useState, useCallback, memo, useMemo } from "react";
import { makeStyles, createStyles, Paper } from "@material-ui/core";
import HeaderChips from "components/common/molecules/HeaderChips";
import { WorkSheetCollection, WorkSheet } from "types/workSheet";
import { PrimaryButton } from "components/common/atoms/Buttons";
import IconButton from "components/common/atoms/IconButton";
import Dialog from "components/common/molecules/Dialog";
import TextFieldList from "../molecules/TextFieldList";

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
  categories: WorkSheetCollection["categories"];
  workSheet: WorkSheet;
  categoryFilter: Record<string, boolean>;
  filterCategory: (category: string) => () => void;
  changeWorkSheet: (category: string, index: number, value: string) => void;
  addNewTextField: (category: string) => void;
  removeWorkSheet: (label: string, index: number) => () => void;
  clickSubmitButton: (
    categories: WorkSheetCollection["categories"],
    workSheet: WorkSheet
  ) => void;
};

const Manage: React.FC<Props> = ({
  categories,
  workSheet,
  categoryFilter,
  filterCategory,
  changeWorkSheet,
  addNewTextField,
  removeWorkSheet,
  clickSubmitButton,
}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const chips = useMemo(
    () =>
      Object.keys(categoryFilter).map((category) => ({
        label: category,
        filtered: categoryFilter[category],
        handleClick: filterCategory(category),
      })),
    [categoryFilter, filterCategory]
  );

  const handleEditText = useCallback(
    (category: string) => (index: number) => (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      changeWorkSheet(category, index, event.target.value);
    },
    [changeWorkSheet]
  );

  return (
    <Paper elevation={5} className={classes.root}>
      <div className={classes.chips}>
        <HeaderChips chips={chips} />
        <IconButton
          iconName="add"
          label="add"
          size="small"
          onClick={() => setOpen(true)}
        />
      </div>
      <section className={classes.questions}>
        {categories.map((category) => {
          const filterd = categoryFilter[category];

          return filterd ? null : (
            <div key={category} className={classes.labelGroup}>
              <TextFieldList
                label={category}
                values={workSheet[category]}
                handleChangeExsingText={handleEditText(category)}
                addNewTextField={() => addNewTextField(category)}
                removeTextField={removeWorkSheet}
              />
            </div>
          );
        })}
      </section>
      <div className={classes.submitButton}>
        <PrimaryButton
          text="この内容で更新する"
          onClick={() => clickSubmitButton(categories, workSheet)}
        />
      </div>
      <Dialog
        id="id"
        title="タイトル"
        open={open}
        handleClose={() => setOpen(false)}
      />
    </Paper>
  );
};

export default memo(Manage);
