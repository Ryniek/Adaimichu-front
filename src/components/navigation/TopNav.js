import React from "react";
import { Tabs, Tab, Grid, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { logout } from "../../store/actions/auth";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";

function TopNav(props) {
  const [value, setValue] = React.useState("one");
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const logoutHandler = () => {
    props.logout();
    navigate("/");
  };

  const profileNavigateHandler = () => {
    navigate("/profile")
  }

  return (
    <Grid
      container
      spacing={2}
      alignItems="center"
      justify="center"
      style={{ minHeight: "8vh" }}
    >
      <Grid item xs={12} sm={8} align={{xs:"center", sm:"flex-start"}}>
        <Link to="/owned">
        <Box
          component="img"
          sx={{
            height: 233,
            width: 350,
            maxHeight: { xs: 233, md: 167 },
            maxWidth: { xs: 350, md: 250 },
          }}
          alt="App logo"
          src={"./ada-i-michu-logo.png"}
        />
        </Link>
      </Grid>
      <Grid item xs={12} sm={4} align="center">
        {props.auth.isLoggedIn ? (
          <PopupState variant="popover" popupId="demo-popup-menu">
            {(popupState) => (
              <React.Fragment>
                <Button size="large" variant="contained" {...bindTrigger(popupState)}>
                  Ustawienia
                </Button>
                <Menu {...bindMenu(popupState)}>
                  <MenuItem onClick={() => profileNavigateHandler()}>Profil</MenuItem>
                  <MenuItem onClick={() => logoutHandler()}>Wyloguj</MenuItem>
                </Menu>
              </React.Fragment>
            )}
          </PopupState>
        ) : null}
      </Grid>

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
              value="one"
              label="Własne zadania"
              component={Link}
              to="/owned"
            />
            <Tab
              value="two"
              label="Wylosowane zadania"
              component={Link}
              to="/drawn"
            />
            <Tab
              value="three"
              label="Zakończone zadania"
              component={Link}
              to="/finished"
            />
          </Tabs>
        </Grid>
      ) : null}
    </Grid>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
  };
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TopNav);
