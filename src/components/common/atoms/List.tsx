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

const List = ({ items }: Props) => (
  <BaseList>
    {items.map(({ title, icon, text }) => (
      <ListItem key={title} button>
        {icon && <ListItemIcon>{icon}</ListItemIcon>}
        {text && <ListItemText primary={text} />}
      </ListItem>
    ))}
    {/* <ListItem button key="text">
      <ListItemIcon>
        <CheckBoxIcon />
      </ListItemIcon>
      <ListItemText primary="text" />
    </ListItem>
    <ListItem button key="text">
      <ListItemIcon>
        <PersonIcon />
      </ListItemIcon>
      <ListItemText primary="text" />
    </ListItem>
    <ListItem button key="analytics">
      <ListItemIcon>
        <EqualizerIcon />
      </ListItemIcon>
      <ListItemText primary="analytics" />
    </ListItem>
    <ListItem button key="hoge">
      <ListItemIcon>
        <TimelineIcon />
      </ListItemIcon>
      <ListItemText primary="hoge" />
    </ListItem> */}
  </BaseList>
);

export default memo(List);
