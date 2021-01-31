import React, { memo } from "react";
import Chip from "components/common/atoms/Chip";
import { makeStyles, createStyles } from "@material-ui/core";

const useStyles = makeStyles(() =>
  createStyles({
    chips: {
      display: "flex",
      alignItems: "center",
      flexWrap: "wrap",
    },
    chip: {
      marginRight: "2vw",
      marginBottom: "1vw",
    },
  })
);

type Props = {
  chips: Array<{
    label: string;
    filtered?: boolean;
    handleClick: () => void;
  }>;
};

const HeaderChips: React.FC<Props> = ({ chips }) => {
  const classes = useStyles();

  return (
    <div className={classes.chips}>
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
    </div>
  );
};

export default memo(HeaderChips);
