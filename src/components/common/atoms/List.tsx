import React, { memo } from "react";
import BaseList from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { ListItemIcon } from "@material-ui/core";

type Item = {
  title: string;
  text?: string;
  icon?: JSX.Element;
};

type Props = {
  items: Array<Item>;
};

const List: React.FC<Props> = ({ items }) => (
  <BaseList>
    {items.map(({ title, icon, text }) => (
      <ListItem key={title} button>
        {icon && <ListItemIcon>{icon}</ListItemIcon>}
        {text && <ListItemText primary={text} />}
      </ListItem>
    ))}
  </BaseList>
);

export default memo(List);
