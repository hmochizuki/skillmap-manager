import React, { memo } from "react";
import { makeStyles, createStyles } from "@material-ui/core";
import { SkillMap } from "types/skillmap";
import HeaderChips from "components/common/molecules/HeaderChips";
import Checkbox from "components/common/atoms/Checkbox";

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
  skillmap: SkillMap;
};

const Answer: React.FC<Props> = ({ skillmap }) => {
  const classes = useStyles();
  const chips = skillmap.map((e) => ({
    label: e.label,
    handleClick: () => {},
  }));

  return (
    <>
      <HeaderChips chips={chips} edit={false} />
      <section className={classes.questions}>
        {skillmap.map((map) => {
          return (
            <div key={map.id} className={classes.labelGroup}>
              {map.questions.map((e, i) => {
                return (
                  <div key={e.id} className={classes.question}>
                    <p>{i === 0 && map.label}</p>
                    <Checkbox
                      name={e.id}
                      checked={false}
                      label={e.question}
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
