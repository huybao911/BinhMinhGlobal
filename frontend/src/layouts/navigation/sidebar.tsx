import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { logOutAdmin } from "../../redux/actions/admin";
import { RootState } from "../../redux/reducers";
import { Box, Drawer, Avatar, Typography, Divider } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';

import NavSection from "./navSelection";

const NAV_WIDTH = 270;

const SideBar: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();

  const admin = useSelector((state: RootState) => state.admin);

  const topLinks =
  admin.isAuthenticated && admin.getRole.keyRole === "admin" && window.location.pathname.includes('/user') || admin.isAuthenticated && admin.getRole.keyRole === "admin" && window.location.pathname.includes('/city') || admin.isAuthenticated && admin.getRole.keyRole === "admin" && window.location.pathname.includes('/addcity') || admin.isAuthenticated && admin.getRole.keyRole === "admin" && window.location.pathname.includes('/product') || admin.isAuthenticated && admin.getRole.keyRole === "admin" && window.location.pathname.includes('/newproduct') || admin.isAuthenticated && admin.getRole.keyRole === "admin" && window.location.pathname.includes('/typeproduct') || admin.isAuthenticated && admin.getRole.keyRole === "admin" && window.location.pathname.includes('/newtypeproduct') ? (
      <Box>
        <Box
          style={{
            display: "flex", flexDirection: "row",
            borderRadius: "16px", padding: "20px 10px",
            backgroundColor: '#f5f5f5', marginTop: '40px'
          }}>
          <Box>
            <Avatar style={{ backgroundColor: "green", margin: "0 10px" }}>
              {admin.admin.username.charAt(0).toUpperCase()}
            </Avatar>
          </Box>
          <Box style={{ display: "flex", flexDirection: "column", textAlign: "left" }}>
            <Box style={{ fontSize: "14px", marginBottom: "5px" }}>
              {admin.admin.username}
            </Box>
            <Typography style={{ fontSize: "13px" }}>
              {admin.getRole.nameRole}
            </Typography>
          </Box>
        </Box>
      </Box>
    ) : null;



  const bottomLinks = admin.isAuthenticated && window.location.pathname.includes('/user') || admin.isAuthenticated && window.location.pathname.includes('/city') || admin.isAuthenticated && window.location.pathname.includes('/addcity') || admin.isAuthenticated && window.location.pathname.includes('/product') || admin.isAuthenticated && window.location.pathname.includes('/newproduct') || admin.isAuthenticated && window.location.pathname.includes('/typeproduct') || admin.isAuthenticated && window.location.pathname.includes('/newtypeproduct') || admin.isAuthenticated && window.location.pathname.includes('/orderCart') ? (
    <Box onClick={(e) => dispatch(logOutAdmin())} style={{ display: 'flex', marginBottom: "20px", justifyContent: 'center', cursor: 'pointer' }}>
      <Box style={{
        border: '1px solid #b5b5b5',
        borderRadius: '12px', textAlign: 'center',
        marginTop: '20px', padding: '6px', paddingTop: '8px',
        width: 140, display: 'flex', flexDirection: 'row', justifyContent: 'center'
      }}>
        <Typography style={{ fontSize: '14px', paddingRight: '10px' }} >
          Đăng xuất
        </Typography>
        <LogoutIcon style={{ width: '14px', color: '#ee6f81', paddingBottom: '2px' }} />
      </Box>
    </Box>
  ) :null

  const sideBar = admin.isAuthenticated && window.location.pathname.includes('/user') || admin.isAuthenticated && window.location.pathname.includes('/city') || admin.isAuthenticated && window.location.pathname.includes('/addcity') || admin.isAuthenticated && window.location.pathname.includes('/product') || admin.isAuthenticated && window.location.pathname.includes('/newproduct') || admin.isAuthenticated && window.location.pathname.includes('/typeproduct') || admin.isAuthenticated && window.location.pathname.includes('/newtypeproduct') || admin.isAuthenticated && window.location.pathname.includes('/orderCart') ? (
    <>
      <Box component="nav"
        sx={{
          flexShrink: { lg: 0 },
          width: { lg: NAV_WIDTH },
        }}>
        <Drawer
          open
          variant='permanent'
          PaperProps={{
            sx: {
              width: NAV_WIDTH,
              bgcolor: 'background.default',
              borderRightStyle: 'dashed'
            }
          }}>

          <Box sx={{ px: 2, py: 3, display: 'inline-block', fontWeight: "bold" }}>
            {topLinks}
          </Box>
          <Divider />

          <NavSection />
          <Box flexGrow={1} />

          <Divider  />
          {bottomLinks}

        </Drawer>
      </Box>

    </>
  ) : null

  return (
    <>
      {sideBar}
    </>
  );
};

export default SideBar;
