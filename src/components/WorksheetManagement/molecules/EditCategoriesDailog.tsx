import React, { memo, useState, FC, useCallback, useEffect } from "react";
import { makeStyles, createStyles } from "@material-ui/core";
import IconButton from "components/common/atoms/IconButton";
import Dialog from "components/common/molecules/Dialog";
import shortid from "shortid";
import { WorksheetWithFilter, emptyWorkSheetWithFilter } from "../type";
import DeletableTextField from "./DeletableTextField";

const useStyles = makeStyles(() =>
  createStyles({
    contents: {
      display: "flex",
      flexDirection: "column",
    },
    item: {
      marginBottom: "1vh",
    },
  })
);

type Props = {
  worksheet: WorksheetWithFilter;
  open: boolean;
  handleClose: (ws: WorksheetWithFilter) => () => void;
};

const getNewCategory = () => ({
  id: shortid.generate(),
  name: "",
  questions: [{ id: shortid.generate(), value: "" }],
  filtered: false,
});

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
    (categoryId: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const next = worksheetWithFilter.map((category) =>
        category.id === categoryId
          ? { ...category, name: event.target.value }
          : category
      );
      setWorksheetWithFilter(next);
    },
    [worksheetWithFilter]
  );

  const removeCategory = useCallback(
    (categoryId: string) => () => {
      const next = worksheetWithFilter.filter(
        (category) => category.id !== categoryId
      );
      setWorksheetWithFilter(next);
    },
    [worksheetWithFilter]
  );

  const addCategory = useCallback(() => {
    const next = [...worksheetWithFilter, getNewCategory()];
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
        {worksheetWithFilter.map(({ id, name }) => {
          return (
            <div key={id} className={classes.item}>
              <DeletableTextField
                id={id}
                value={name}
                handleChange={editCategory(id)}
                handleDelete={removeCategory(id)}
              />
            </div>
          );
        })}
        <IconButton label="" iconName="add" onClick={addCategory} />
      </div>
    </Dialog>
  );
};

export default memo(EditCategoiesDialog);
