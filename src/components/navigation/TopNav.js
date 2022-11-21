import React from "react";
import { Tabs, Tab, Grid, Typography } from "@mui/material";

function TopNav() {
  const [value, setValue] = React.useState("one");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Grid container spacing={2} alignItems="center" justify="center" style={{ minHeight: '8vh' }}>
      <Grid item xs={8} align="center">
        <Tabs
        centered
          value={value}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="secondary tabs example"
        >
          <Tab value="one" label="Item One" />
          <Tab value="two" label="Item Two" />
          <Tab value="three" label="Item Three" />
        </Tabs>
      </Grid>
      <Grid item xs={4} align="center">
        <Typography>LOGOUT</Typography>
      </Grid>
    </Grid>
  );
}

export default TopNav;
