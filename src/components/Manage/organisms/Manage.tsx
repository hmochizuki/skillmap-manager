import React, { useCallback } from "react";
import { makeStyles, createStyles } from "@material-ui/core";
import HeaderChips from "components/common/molecules/HeaderChips";
import { WorkSheetCollection, WorkSheet } from "types/workSheet";
import TextFieldList from "../molecules/TextFieldList";

const useStyles = makeStyles(() =>
  createStyles({
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
  })
);

type Props = {
  categories: WorkSheetCollection["categories"];
  workSheet: WorkSheet;
  categoryFilter: Record<string, boolean>;
  changeCategoriesfilter: (category: string, filter: boolean) => void;
  changeWorkSheet: (category: string, index: number, value: string) => void;
  addNewQuestion: (category: string, value: string) => void;
};

const Manage: React.FC<Props> = ({
  categories,
  workSheet,
  categoryFilter,
  changeCategoriesfilter,
  changeWorkSheet,
  addNewQuestion,
}) => {
  const classes = useStyles();

  const chips = categories.map((e) => ({
    label: e,
    filtered: categoryFilter[e],
    handleClick: () => changeCategoriesfilter(e, !categoryFilter[e]),
  }));

  const handleNewText = useCallback(
    (category: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      addNewQuestion(category, event.target.value);
    },
    [addNewQuestion]
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
    <>
      <HeaderChips chips={chips} edit />
      <section className={classes.questions}>
        {categories.map((category) => {
          return (
            <div key={category} className={classes.labelGroup}>
              <TextFieldList
                label={category}
                values={workSheet[category]}
                handleChangeExsingText={handleEditText(category)}
                handleChangeNewText={handleNewText(category)}
              />
            </div>
          );
        })}
      </section>
    </>
  );
};

export default Manage;
