import React, { useCallback } from "react";
import { makeStyles, createStyles, Paper } from "@material-ui/core";
import HeaderChips from "components/common/molecules/HeaderChips";
import { WorkSheetCollection, WorkSheet } from "types/workSheet";
import { PrimaryButton } from "components/common/atoms/Buttons";
import TextFieldList from "../molecules/TextFieldList";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      padding: "2vh 2vw",
    },
    chips: {
      display: "flex",
      flexGrow: 3,
      flexWrap: "wrap",
      alignItems: "center",
      marginBottom: "3vh",
    },
    chip: {
      margin: "0 1vw",
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
  categories: WorkSheetCollection["categories"];
  workSheet: WorkSheet;
  categoryFilter: Record<string, boolean>;
  changeCategoriesfilter: (category: string, filter: boolean) => void;
  changeWorkSheet: (category: string, index: number, value: string) => void;
  addNewTextField: (category: string) => void;
  clickSubmitButton: (
    categories: WorkSheetCollection["categories"],
    workSheet: WorkSheet
  ) => void;
};

const Manage: React.FC<Props> = ({
  categories,
  workSheet,
  categoryFilter,
  changeCategoriesfilter,
  changeWorkSheet,
  addNewTextField,
  clickSubmitButton,
}) => {
  const classes = useStyles();

  const chips = categories.map((e) => ({
    label: e,
    filtered: categoryFilter[e],
    handleClick: () => changeCategoriesfilter(e, !categoryFilter[e]),
  }));

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
      <HeaderChips chips={chips} edit />
      <section className={classes.questions}>
        {categories.map((category) => {
          return (
            <div key={category} className={classes.labelGroup}>
              <TextFieldList
                label={category}
                values={workSheet[category]}
                handleChangeExsingText={handleEditText(category)}
                addNewTextField={() => addNewTextField(category)}
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
    </Paper>
  );
};

export default Manage;
