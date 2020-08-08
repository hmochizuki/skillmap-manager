import React, { memo } from "react";
import LeftClose from "@material-ui/icons/ChevronLeft";
import CheckBox from "@material-ui/icons/CheckBox";
import Account from "@material-ui/icons/AccountBox";
import Settings from "@material-ui/icons/Settings";
import Timeline from "@material-ui/icons/TrendingUp";
import Equalizer from "@material-ui/icons/Equalizer";
import Help from "@material-ui/icons/Help";
import Create from "@material-ui/icons/Create";
import Error from "@material-ui/icons/ErrorOutline";
import Navigation from "@material-ui/icons/NavigateNext";
import Expand from "@material-ui/icons/ExpandMore";
import AddCircle from "@material-ui/icons/AddCircle";

export type IconName =
  | "edit"
  | "mySkillmap"
  | "checkbox"
  | "teamSkillmap"
  | "timelineGraphs"
  | "settings"
  | "help"
  | "leftClose"
  | "navigation"
  | "expand"
  | "add"
  | "error";

type Props = {
  name: IconName;
  size?: "small" | "large" | undefined;
};

const Icon: React.FC<Props> = ({ name, size }) => {
  switch (name) {
    case "edit":
      return <Create fontSize={size} />;
    case "checkbox":
      return <CheckBox fontSize={size} />;
    case "mySkillmap":
      return <Account fontSize={size} />;
    case "teamSkillmap":
      return <Equalizer fontSize={size} />;
    case "timelineGraphs":
      return <Timeline fontSize={size} />;
    case "settings":
      return <Settings fontSize={size} />;
    case "help":
      return <Help fontSize={size} />;
    case "leftClose":
      return <LeftClose fontSize={size} />;
    case "navigation":
      return <Navigation fontSize={size} />;
    case "expand":
      return <Expand fontSize={size} />;
    case "add":
      return <AddCircle fontSize={size} />;
    default:
      return <Error fontSize={size} />;
  }
};

export default memo(Icon);
