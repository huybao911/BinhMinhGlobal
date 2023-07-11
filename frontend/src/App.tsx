import React from "react";
import { BrowserRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { styled } from '@mui/material/styles';

// import AppHeader from "layouts/navigation/AppHeader";
import SideBar from "./layouts/navigation/sidebar";
// import HeaderHome from "/pages/homepage/HeaderHome";

import Routes from "./components/routing/Routes";

import { setAdminAuthToken } from "./utils/headers";
import { setUserAuthToken } from "./utils/headers";


import { loadAdmin } from "./redux/actions/admin";
import { loadUser } from "./redux/actions/user";

if (localStorage.admin__token) setAdminAuthToken(localStorage.admin__token);
if (localStorage.user__token) setUserAuthToken(localStorage.user__token);

const StyledRoot = styled('div')({
  display: 'flex',
  minHeight: '100%',
});


const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const Main = styled('div')(({ theme }) => ({
  flexGrow: 2,
  // marginLeft: 270,
  minHeight: '100%',
  
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24,
  },
}));

const App: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();

  // React.useEffect(() => dispatch<any>(loadAdmin()), [dispatch]);
  React.useEffect(() => dispatch<any>(loadUser()), [dispatch]);

  return (
    <BrowserRouter>
      <>
        <StyledRoot>
          {/* <AppHeader/> */}
          <SideBar />
          {/* <HeaderHome /> */}

          <Main >
            <Routes />
          </Main>

        </StyledRoot>
      </>
    </BrowserRouter>
  );
};

export default App;
