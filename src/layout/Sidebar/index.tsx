import React from 'react';
import {Box, IconButton, Typography, useTheme} from "@mui/material";
import {Menu, MenuItem, Sidebar, useProSidebar} from "react-pro-sidebar";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import {tokens} from "../../theme";
import {menuItemStyles} from "./Sidebar.theme";
import {useLocation} from "react-router-dom";
import {Item} from "./Item";


const SidebarMenu = () => {
  const location = useLocation()
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const {collapsed, collapseSidebar} = useProSidebar();
  const style = {
    display: 'flex', height: '100%', minHeight: '400px'
  } as const;
  return (
    <Box sx={style}>
      <Sidebar
        backgroundColor={colors.primary[400]}
        rootStyles={{borderColor: colors.primary[900]}}
      >
        <Menu menuItemStyles={menuItemStyles()}>
          <MenuItem
            onClick={() => collapseSidebar()}
            icon={collapsed ? <MenuOutlinedIcon/> : undefined}
            style={{
              margin: "10px 0 20px 0",
            }}
          >
            {!collapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant='h3' color={colors.grey[100]}>
                  ADMINS
                </Typography>
                <IconButton>
                  <MenuOutlinedIcon/>
                </IconButton>
              </Box>
            )}
          </MenuItem>


          {/*  Menu Items*/}
          <Box paddingLeft={collapsed ? undefined : '10%'}>
            <Item
              title="Dashboard"
              to='/'
              icon={<HomeOutlinedIcon/>}
              location={location.pathname}
            />

            <Typography
              variant='h6'
              color={colors.grey[200]}
              sx={{m: '10px 0 5px 20px'}}
            >
              Data
            </Typography>
            <Item
              title="Manage Team"
              to='/team'
              icon={<PeopleOutlinedIcon/>}
              location={location.pathname}
            />
          </Box>
        </Menu>
      </Sidebar>
    </Box>
  )
}

export default SidebarMenu