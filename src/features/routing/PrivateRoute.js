import { connect } from "react-redux";
import { Navigate } from "react-router-dom";

function PrivateRoute(props) {
  if (props.auth.isLoggedIn) {
    if (props.roleUser) {
      if (!props.auth.user.roles.includes("ROLE_USER")) {
        return null;
      }
    }
    if (props.roleAdmin) {
      if (!props.auth.user.roles.includes("ROLE_ADMIN")) {
        return null;
      }
    }
  }
  return props.children;
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, null)(PrivateRoute);
