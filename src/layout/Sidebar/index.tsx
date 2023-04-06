import React from 'react';
import {Avatar, Box, IconButton, Typography, useTheme} from "@mui/material";
import {Menu, MenuItem, Sidebar, useProSidebar} from "react-pro-sidebar";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import CardTravelOutlinedIcon from '@mui/icons-material/CardTravelOutlined';
import LibraryAddOutlinedIcon from '@mui/icons-material/LibraryAddOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import SellOutlinedIcon from '@mui/icons-material/SellOutlined';
import PointOfSaleOutlinedIcon from '@mui/icons-material/PointOfSaleOutlined';
import {tokens} from "../../theme";
import {menuItemStyles} from "./Sidebar.theme";
import {useLocation} from "react-router-dom";
import {Item} from "./Item";
import {useAppSelector} from "../../hooks/redux";
import {useDictionaryTranslate} from "../../hooks/pages";


const SidebarMenu = () => {
  const dict = useDictionaryTranslate('sidebar')
  const location = useLocation()
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const {collapsed, collapseSidebar} = useProSidebar();
  const style = {
    display: 'flex', minHeight: '400px'
  } as const;
  const userName = useAppSelector(state => state.authReducer.username)
  const isAuthenticated = useAppSelector(state => state.authReducer.isAuthenticated)
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
                  {
                    userName ?
                      <Avatar sx={{backgroundColor: colors.greenAccent[500]}}>{userName[0].toUpperCase()}</Avatar>
                      :
                      dict('admin')
                  }
                </Typography>
                <IconButton>
                  <MenuOutlinedIcon/>
                </IconButton>
              </Box>
            )}
          </MenuItem>


          {/*  Menu Items*/}
          <Box
            paddingLeft={collapsed ? undefined : '10%'}
            hidden={!isAuthenticated}
          >
            <Item
              title={dict('dashboard')}
              to='/'
              icon={<HomeOutlinedIcon/>}
              location={location.pathname}
            />

            <Typography
              variant='h6'
              color={colors.grey[200]}
              sx={{m: '10px 0 5px 20px'}}
            >
              {dict('data')}
            </Typography>
            <Item
              title={dict('sellers')}
              to='/sellers'
              icon={<PeopleOutlinedIcon/>}
              location={location.pathname}
            />
            <Item
              title={dict('places')}
              to='/places'
              icon={<StorefrontOutlinedIcon/>}
              location={location.pathname}
            />
            <Item
              title={dict('expenses')}
              to='/expenses'
              icon={<CardTravelOutlinedIcon/>}
              location={location.pathname}
            />
            <Item
              title={dict('newProducts')}
              to='/new-products'
              icon={<LibraryAddOutlinedIcon/>}
              location={location.pathname}
            />
            <Item
              title={dict('itemsEditor')}
              to='/items-editor'
              icon={<Inventory2OutlinedIcon/>}
              location={location.pathname}
            />
            <Item
              title={dict('productsEditor')}
              to='/products-editor'
              icon={<SellOutlinedIcon/>}
              location={location.pathname}
            />
            <Item
              title={'Mew Sale'}
              to='/new-sales'
              icon={<PointOfSaleOutlinedIcon/>}
              location={location.pathname}
            />
          </Box>
        </Menu>
      </Sidebar>
    </Box>
  )
}

export default SidebarMenu