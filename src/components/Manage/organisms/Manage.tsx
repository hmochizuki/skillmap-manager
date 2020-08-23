import React, { memo } from "react";
import { makeStyles, createStyles } from "@material-ui/core";
import TextField from "components/common/atoms/TextField";
import HeaderChips from "components/common/molecules/HeaderChips";
import { WorkSheetCollection, WorkSheet } from "types/workSheet";

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
    question: {
      width: "40vw",
      marginBottom: "1vh",
    },
  })
);

type Props = {
  categories: WorkSheetCollection["categories"];
  workSheet: WorkSheet;
  categoryFilter: Record<string, boolean>;
  changeCategoriesfilter: (category: string, filter: boolean) => void;
};

const Manage: React.FC<Props> = ({
  categories,
  workSheet,
  categoryFilter,
  changeCategoriesfilter,
}) => {
  const classes = useStyles();

  const chips = categories.map((e) => ({
    label: e,
    filtered: categoryFilter[e],
    handleClick: () => changeCategoriesfilter(e, !categoryFilter[e]),
  }));

  return (
    <>
      <HeaderChips chips={chips} edit />
      <section className={classes.questions}>
        {categories.map((category) => {
          return (
            <div key={category} className={classes.labelGroup}>
              {workSheet[category].map((e, i) => {
                return (
                  <>
                    {i === 0 && (
                      <div key={`${category}_new`} className={classes.question}>
                        <TextField
                          id={e}
                          label={category}
                          placeholder="入力してください"
                          fullWidth
                        />
                      </div>
                    )}
                    <div key={e} className={classes.question}>
                      <TextField
                        id={e}
                        defaultValue={e}
                        placeholder="入力してください"
                        fullWidth
                      />
                    </div>
                  </>
                );
              })}
            </div>
          );
        })}
      </section>
    </>
  );
};

export default memo(Manage);
