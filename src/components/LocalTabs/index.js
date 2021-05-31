import { Grid, Paper, Tab, Tabs } from "@material-ui/core";
import React, { useState } from "react";
import TabPanel from "../TabPanel";
import Body from "./Body";
import Params from "./Params";
import Headers from "./Headers";

const a11yProps = (field) => ({
  id: `wrapped-tab-${field}`,
  "aria-controls": `wrapped-tabpanel-${field}`,
});

const LocalTabs = () => {
  const [value, setValue] = useState("params");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Grid item>
      <Paper square elevation={2}>
        <Tabs
          value={value}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChange}
          aria-label="request"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="Params" value="params" {...a11yProps("params")} />
          <Tab label="Headers" value="headers" {...a11yProps("headers")} />
          <Tab label="Body" value="body" {...a11yProps("body")} />
        </Tabs>
      </Paper>
      <TabPanel value={value} field="params">
        <Params />
      </TabPanel>
      <TabPanel value={value} field="headers">
        <Headers />
      </TabPanel>
      <TabPanel value={value} field="body">
        <Body />
      </TabPanel>
    </Grid>
  );
};

export default LocalTabs;
