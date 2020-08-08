import React, { memo } from "react";
import Chip from "components/common/atoms/Chip";
import { makeStyles, createStyles } from "@material-ui/core";
import TextField from "components/common/atoms/TextField";
import IconButton from "components/common/atoms/IconButton";
import { SkillMap } from "types/skillmap";

const useStyles = makeStyles(() =>
  createStyles({
    header: {
      display: "flex",
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
    question: {
      width: "40vw",
      marginBottom: "1vh",
    },
  })
);

type Props = {
  skillmap: SkillMap;
};

const Manage: React.FC<Props> = ({ skillmap }) => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.header}>
        <div className={classes.chips}>
          {skillmap.map((e) => (
            <div key={e.id} className={classes.chip}>
              <Chip
                variant="default"
                size="medium"
                handleClick={() => {}}
                label={e.label}
              />
            </div>
          ))}
          <IconButton
            iconName="add"
            label="add"
            size="small"
            onClick={() => {}}
          />
        </div>
      </div>
      <section className={classes.questions}>
        {skillmap.map((map) => {
          return (
            <div key={map.id} className={classes.labelGroup}>
              {map.questions.map((e, i) => {
                return (
                  <>
                    {i === 0 && (
                      <div key={`${map.id}_new`} className={classes.question}>
                        <TextField
                          id={e.id}
                          label={map.label}
                          placeholder="入力してください"
                          fullWidth
                        />
                      </div>
                    )}
                    <div key={e.id} className={classes.question}>
                      <TextField
                        id={e.id}
                        defaultValue={e.question}
                        placeholder="入力してくさい"
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

      <section />
    </>
  );
};

export default memo(Manage);
