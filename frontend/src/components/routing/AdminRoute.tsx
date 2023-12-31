import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { useSelector } from "react-redux";

import AppLoader from "../../layouts/AppLoader";
import { RootState } from "../../redux/reducers";

type Props = {
  component: React.ComponentType<RouteProps>;
};

const AdminRoute: React.FC<Props> = ({
  component: Component,
  ...rest
}): JSX.Element => {
  const admin = useSelector((state: RootState) => state.admin);

  return (
    <Route
      render={(props) => {
        if (admin.loading) {
          return <AppLoader />;
        }
        if (!admin.isAuthenticated) {
          return <Redirect to='/chienlogin' />;
        }
        if (admin.isAuthenticated && admin.getRole.keyRole === "admin") {
          return <Component {...props} />;
        }
      }}
      {...rest}
    />
  );
};

export default AdminRoute;
