import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { useSelector } from "react-redux";

// import AppLoader from "layouts/AppLoader";
import { RootState } from "../../redux/reducers";

type Props = {
    component: React.ComponentType<RouteProps>;
};

const GuestRoute: React.FC<Props> = ({
    component: Component,
    ...rest
}): JSX.Element => {
    const admin = useSelector((state: RootState) => state.admin);
    const user = useSelector((state: RootState) => state.user);



    return (
        <Route
            render={(props) => {
                if (user.isAuthenticated && user.getRole.keyRole === "user") {
                    return <Redirect to='/' />;
                } else if (admin.isAuthenticated && admin.getRole.keyRole === "admin") {
                    return <Redirect to='/user' />;
                } else {
                    return <Component {...props} />;
                }
            }}
            {...rest}
        />
    );
};

export default GuestRoute;
