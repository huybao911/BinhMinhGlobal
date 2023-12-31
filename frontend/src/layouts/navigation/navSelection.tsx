import * as React from "react";
import { ListItemText, ListItemIcon } from '@mui/material';
import { StyledListItemButton } from './style';
import { dataAdmin } from './dataConfig'
import { useSelector } from "react-redux";
import { RootState } from "../../redux/reducers";
import { Stack } from '@mui/system';

import { NavLink as RtLink } from 'react-router-dom';

export default function NavSection() {
    const [selectedIndex, setSelectedIndex] = React.useState(1);

    const handleListItemClick = (event: any, index: any) => {
        setSelectedIndex(index);
    };

    const admin = useSelector((state: RootState) => state.admin);
    const topAM = admin.isAuthenticated && admin.getRole.keyRole === "admin" && window.location.pathname.includes('/user') || admin.isAuthenticated && admin.getRole.keyRole === "admin" && window.location.pathname.includes('/city') || admin.isAuthenticated && admin.getRole.keyRole === "admin" && window.location.pathname.includes('/addcity') || admin.isAuthenticated && admin.getRole.keyRole === "admin" && window.location.pathname.includes('/product') || admin.isAuthenticated && admin.getRole.keyRole === "admin" && window.location.pathname.includes('/newproduct') || admin.isAuthenticated && admin.getRole.keyRole === "admin" && window.location.pathname.includes('/typeproduct') || admin.isAuthenticated && admin.getRole.keyRole === "admin" && window.location.pathname.includes('/newtypeproduct') || admin.isAuthenticated && admin.getRole.keyRole === "admin" && window.location.pathname.includes('/orderCart') ? (
        <Stack spacing={2} style={{ padding: "10px 14px" }}>
            {dataAdmin.map((item, index) => (
                <StyledListItemButton disableRipple selected={selectedIndex === index} onClick={(event) => handleListItemClick(event, index)}
                    component={RtLink} to={item.path} key={item.name} style={{ padding: "8px 3px" }} sx={{
                        "&.Mui-selected": {
                            backgroundColor: "#f4f5f5",
                            fontWeight: "500",
                            borderRadius: "14px",
                            color: 'black'

                        },
                        "&.Mui-selected:hover": {
                            backgroundColor: "#f4f5f5"
                        },
                        "&.Mui-focusVisible": {
                            backgroundColor: "none"
                        },
                        ":hover": {
                            backgroundColor: "white"
                        }
                    }}>
                    <ListItemIcon style={{ paddingLeft: '16px' }}>
                        {item.icon}
                    </ListItemIcon>
                    <ListItemText style={{ fontSize: "12px" }} disableTypography primary={item.name} />
                </StyledListItemButton>
            ))}
        </Stack>
    ) : null;

    return (
        <>
            {topAM}
        </>

    )
}