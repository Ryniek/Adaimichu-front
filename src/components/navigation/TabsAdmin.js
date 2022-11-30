import React from "react";
import { Tabs, Tab, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

function TabsAdmin(props) {
  const [value, setValue] = React.useState(
    window.location.href.substring(window.location.href.lastIndexOf("/") + 1)
  );

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Grid
      container
      spacing={2}
      alignItems="center"
      justify="center"
      style={{ minHeight: "8vh" }}
    >
      {props.auth.isLoggedIn ? (
        <Grid item xs={12} align="center">
          <Tabs
            sx={{
              "& .MuiTabs-flexContainer": {
                flexWrap: "wrap",
              },
            }}
            centered
            value={value}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            aria-label="secondary tabs example"
          >
            <Tab
              value="owned"
              label="Zakończone zadania"
              component={Link}
              to="/finished"
            />
            <Tab
              value="drawn"
              label="Globalne ustawienia"
              component={Link}
              to="/admin/settings"
            />
          </Tabs>
        </Grid>
      ) : null}
    </Grid>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, null)(TabsAdmin);