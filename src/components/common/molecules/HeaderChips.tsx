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
    filtered?: boolean;
    handleClick: () => void;
  }>;
  edit: boolean;
};

const HeaderChips: React.FC<Props> = ({ chips, edit }) => {
  const classes = useStyles();

  return (
    <div className={classes.chips}>
      <Chip size="medium" handleClick={() => {}} label="All" />
      {chips.map((e) => {
        const variant = e.filtered ? "outlined" : "default";

        return (
          <div key={e.label} className={classes.chip}>
            <Chip
              size="medium"
              variant={variant}
              handleClick={e.handleClick}
              label={e.label}
            />
          </div>
        );
      })}
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
