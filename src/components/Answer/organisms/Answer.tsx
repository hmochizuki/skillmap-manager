import React, { memo } from "react";
import { makeStyles, createStyles } from "@material-ui/core";
import HeaderChips from "components/common/molecules/HeaderChips";
import Checkbox from "components/common/atoms/Checkbox";
import { WorkSheet, WorkSheetCollection } from "types/workSheet";

const useStyles = makeStyles(() =>
  createStyles({
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
};

const Answer: React.FC<Props> = ({ categories, workSheet }) => {
  const classes = useStyles();
  const chips = categories.map((e) => ({
    label: e,
    handleClick: () => {},
  }));

  return (
    <>
      <HeaderChips chips={chips} edit={false} />
      <section className={classes.questions}>
        {categories.map((category) => {
          return (
            <div key={category} className={classes.labelGroup}>
              {workSheet[category].map((e, i) => {
                return (
                  <div key={e} className={classes.question}>
                    <p>{i === 0 && category}</p>
                    <Checkbox
                      name={e}
                      checked={false}
                      label={e}
                      onClick={() => {}}
                    />
                  </div>
                );
              })}
            </div>
          );
        })}
      </section>
    </>
  );
};

export default memo(Answer);
