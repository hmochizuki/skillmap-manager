import React, { memo } from "react";
import Chip from "components/common/atoms/Chip";
import { makeStyles, createStyles } from "@material-ui/core";
import IconButton from "components/common/atoms/IconButton";

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
  })
);

type Props = {
  chips: Array<{
    label: string;
    handleClick: () => void;
  }>;
  edit: boolean;
};

const HeaderChips: React.FC<Props> = ({ chips, edit }) => {
  const classes = useStyles();

  return (
    <div className={classes.chips}>
      <Chip
        variant="default"
        size="medium"
        handleClick={() => {}}
        label="All"
      />
      {chips.map((e) => (
        <div key={e.label} className={classes.chip}>
          <Chip
            variant="default"
            size="medium"
            handleClick={() => {}}
            label={e.label}
          />
        </div>
      ))}
      {edit && (
        <IconButton
          iconName="add"
          label="add"
          size="small"
          onClick={() => {}}
        />
      )}
    </div>
  );
};

export default memo(HeaderChips);
