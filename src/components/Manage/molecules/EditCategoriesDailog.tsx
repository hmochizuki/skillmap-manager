import React, { memo, useState, FC, useMemo, useCallback } from "react";
import { makeStyles, createStyles } from "@material-ui/core";
import TextField from "components/common/atoms/TextField";
import { WorkSheetCollection } from "types/workSheet";
import IconButton from "components/common/atoms/IconButton";
import Dialog from "components/common/molecules/Dialog";

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
const Item: FC<any> = memo(({ value, editCategory, removeCategory }) => {
  const classes = useStyles();
  const [disabled, setDisabled] = useState(true);

  return (
    <div className={classes.item}>
      <TextField
        id={value}
        name="categories"
        value={value}
        disabled={disabled}
        onBlur={() => setDisabled(true)}
        handleChange={(e) => editCategory(e.target.value)}
        className={classes.element}
      />
      <IconButton
        label={value}
        iconName="edit"
        onClick={() => setDisabled(false)}
        className={classes.element}
      />
      <IconButton label={value} iconName="delete" onClick={removeCategory} />
    </div>
  );
});

type Props = {
  categories: WorkSheetCollection["categories"];
  open: boolean;
  handleClose: () => void;
};

const EditCategoiesDialog: React.FC<Props> = ({
  categories,
  open,
  handleClose,
}) => {
  const classes = useStyles();
  const [form, setForm] = useState(categories);
  const editCategory = useCallback(
    (index: number) => (value: string) => {
      setForm(form.map((c, i) => (i === index ? value : c)));
    },
    [form]
  );
  const removeCategory = useCallback(
    (index: number) => () => {
      setForm(form.filter((c, i) => i !== index));
    },
    [form]
  );
  const addCategory = useCallback(() => {
    setForm([...form, ""]);
  }, [form]);
  const primaryButton = useMemo(
    () => ({
      label: "保存する",
      handleClick: () => {},
    }),
    []
  );

  return (
    // @ts-ignore
    <Dialog
      id="editCategoies"
      title="カテゴリーの編集"
      discription="カテゴリーを削除した場合、紐づく質問ごと削除することになります。"
      primaryButton={primaryButton}
      open={open}
      handleClose={handleClose}
    >
      <div className={classes.contents}>
        {form.map((category, i) => {
          return (
            <Item
              key={categories}
              value={category}
              editCategory={editCategory(i)}
              removeCategory={removeCategory(i)}
            />
          );
        })}
        <IconButton label="" iconName="add" onClick={addCategory} />
      </div>
    </Dialog>
  );
};

export default memo(EditCategoiesDialog);
