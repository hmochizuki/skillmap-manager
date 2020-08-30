import React, { memo } from "react";
import { makeStyles, createStyles } from "@material-ui/core";
import HeaderChips from "components/common/molecules/HeaderChips";
import Checkbox from "components/common/atoms/Checkbox";
// import { WorkSheet, WorkSheetCollection } from "types/workSheet";

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
  categories: any;
  workSheet: any;
};

const Answer: React.FC<Props> = ({ categories, workSheet }) => {
  const classes = useStyles();
  const chips = categories.map((e: any) => ({
    label: e,
    handleClick: () => {},
  }));

  return (
    <>
      {/* <HeaderChips chips={chips} edit={false} /> */}
      <section className={classes.questions}>
        {categories.map((category: any) => {
          return (
            <div key={category} className={classes.labelGroup}>
              {workSheet[category].map((e: any, i: any) => {
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
