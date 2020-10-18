import React, { FC } from "react";
import {
  Box,
  createStyles,
  makeStyles,
  Tabs as BaseTabs,
  Tab,
} from "@material-ui/core";

const useStyles = makeStyles(() =>
  createStyles({
    tabPanel: {
      padding: "15px",
    },
    content: {
      display: "flex",
      justifyContent: "center",
    },
    createNewTeam: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    textField: {
      width: "400px",
    },
    text: {
      textAlign: "center",
    },
  })
);

export const TabPanel: FC<{
  value: number;
  index: number;
}> = ({ children, value, index }) => {
  const classes = useStyles();

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
    >
      {value === index && <Box className={classes.tabPanel}>{children}</Box>}
    </div>
  );
};

type Props = {
  value: number;
  tabs: { label: string; disabled?: boolean }[];
  onChange: (event: React.ChangeEvent<{}>, ...args: any[]) => void;
};

export const Tabs: FC<Props> = ({ value, tabs, onChange }) => {
  return (
    <>
      <BaseTabs
        value={value}
        indicatorColor="primary"
        textColor="primary"
        onChange={onChange}
      >
        {tabs.map((tab) => (
          <Tab
            key={`tab-${tab.label}`}
            label={tab.label}
            disabled={tab.disabled}
          />
        ))}
      </BaseTabs>
    </>
  );
};
