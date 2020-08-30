import React, { memo, useState, FC, useCallback, useEffect } from "react";
import { makeStyles, createStyles } from "@material-ui/core";
import TextField from "components/common/atoms/TextField";
import IconButton from "components/common/atoms/IconButton";
import Dialog from "components/common/molecules/Dialog";
import { WorksheetWithFilter, emptyWorkSheetWithFilter } from "../type";

const useStyles = makeStyles(() =>
  createStyles({
    contents: {
      display: "flex",
      flexDirection: "column",
    },
    item: {
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-end",
      marginBottom: "1vh",
    },
    element: {
      marginRight: "1vw",
    },
  })
);

// TODO: 共通化
// eslint-disable-next-line react/display-name
const Item: FC<any> = memo(({ id, value, editCategory, removeCategory }) => {
  const classes = useStyles();

  return (
    <div className={classes.item}>
      <TextField
        id={id}
        value={value}
        handleChange={editCategory}
        className={classes.element}
      />
      <IconButton label={value} iconName="delete" onClick={removeCategory} />
    </div>
  );
});

type Props = {
  worksheet: WorksheetWithFilter;
  open: boolean;
  handleClose: (ws: WorksheetWithFilter) => () => void;
};

const newCategory = {
  category: "",
  questions: [""],
  filtered: false,
};

const EditCategoiesDialog: React.FC<Props> = ({
  worksheet,
  open,
  handleClose,
}) => {
  const classes = useStyles();
  const [worksheetWithFilter, setWorksheetWithFilter] = useState(
    emptyWorkSheetWithFilter
  );

  useEffect(() => {
    setWorksheetWithFilter(worksheet);
  }, [worksheet]);

  const editCategory = useCallback(
    (category: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const next = worksheetWithFilter.map((e) =>
        e.category === category ? { ...e, category: event.target.value } : e
      );
      setWorksheetWithFilter(next);
    },
    [worksheetWithFilter]
  );

  const removeCategory = useCallback(
    (category: string) => () => {
      const next = worksheetWithFilter.filter((e) => e.category !== category);
      setWorksheetWithFilter(next);
    },
    [worksheetWithFilter]
  );

  const addCategory = useCallback(() => {
    const next = [...worksheetWithFilter, newCategory];
    setWorksheetWithFilter(next);
  }, [worksheetWithFilter]);

  return (
    // @ts-ignore
    <Dialog
      id="editCategoies"
      title="カテゴリーの編集"
      discription="カテゴリーを削除した場合、紐づく質問ごと削除することになります。"
      open={open}
      handleClose={handleClose(worksheetWithFilter)}
    >
      <div className={classes.contents}>
        {worksheetWithFilter.map(({ category }, i) => {
          return (
            <Item
              // TODO: id を持たせるべきだった...
              // eslint-disable-next-line react/no-array-index-key
              key={i}
              id={`${category}_${i}`}
              value={category}
              editCategory={editCategory(category)}
              removeCategory={removeCategory(category)}
            />
          );
        })}
        <IconButton label="" iconName="add" onClick={addCategory} />
      </div>
    </Dialog>
  );
};

export default memo(EditCategoiesDialog);
